import { createClient } from '@sanity/client'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import inquirer from 'inquirer'

dotenv.config()

// Get dataset choice from user
async function getDatasetChoice() {
  const { dataset } = await inquirer.prompt([
    {
      type: 'list',
      name: 'dataset',
      message: 'Which dataset would you like to configure settings for?',
      choices: [
        { name: 'Development', value: 'development' },
        { name: 'Production', value: 'production' }
      ],
      default: 'development'
    }
  ])
  return dataset
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: await getDatasetChoice(),
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-05-03',
  useCdn: false,
})

// Helper function to upload image
async function uploadImage(imageUrl) {
  const imageResponse = await fetch(imageUrl)
  const arrayBuffer = await imageResponse.arrayBuffer()
  const imageBuffer = Buffer.from(arrayBuffer)
  const imageAsset = await client.assets.upload('image', imageBuffer)
  return imageAsset._id
}

// Delete existing settings
async function deleteSettings() {
  const query = `*[_type == "settings"]`
  const documents = await client.fetch(query)
  
  if (documents.length > 0) {
    console.log(`🗑️  Deleting existing settings...`)
    await Promise.all(documents.map(doc => client.delete(doc._id)))
    console.log(`✅ Deleted existing settings`)
  }
}

// Get user input for settings
async function getUserSettings() {
  const { autoPopulate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'autoPopulate',
      message: 'Would you like to auto-populate settings with sample data?',
      default: false
    }
  ])

  if (autoPopulate) {
    return generateAutoSettings()
  }

  const settings = {
    _type: 'settings'
  }

  // Site Information
  const { includeSiteInfo } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeSiteInfo',
      message: 'Would you like to add site information?',
      default: true
    }
  ])

  if (includeSiteInfo) {
    const siteInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'siteTitle',
        message: 'Enter site title:',
      },
      {
        type: 'input',
        name: 'siteDescription',
        message: 'Enter site description:',
      },
      {
        type: 'input',
        name: 'logoUrl',
        message: 'Enter logo image URL (optional):',
      }
    ])

    settings.siteTitle = siteInfo.siteTitle || undefined
    settings.siteDescription = siteInfo.siteDescription || undefined
    
    if (siteInfo.logoUrl) {
      const logoId = await uploadImage(siteInfo.logoUrl)
      settings.siteLogo = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _weak: true,
          _ref: logoId
        }
      }
    }
  }

  // Organization Information
  const { includeOrg } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeOrg',
      message: 'Would you like to add organization information?',
      default: true
    }
  ])

  if (includeOrg) {
    const orgInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'label',
        message: 'Enter organization label:',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter organization name:',
      },
      {
        type: 'input',
        name: 'businessType',
        message: 'Enter business type:',
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Enter homepage URL:',
      },
      {
        type: 'input',
        name: 'street1',
        message: 'Enter street address:',
      },
      {
        type: 'input',
        name: 'street2',
        message: 'Enter additional address info (optional):',
      },
      {
        type: 'input',
        name: 'city',
        message: 'Enter city:',
      },
      {
        type: 'input',
        name: 'state',
        message: 'Enter state:',
      },
      {
        type: 'input',
        name: 'zip',
        message: 'Enter zip code:',
      },
      {
        type: 'input',
        name: 'phone',
        message: 'Enter phone number:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter email:',
      }
    ])

    const org = {
      _key: faker.string.uuid(),
      label: orgInfo.label || undefined,
      name: orgInfo.name || undefined,
      localBusinessType: orgInfo.businessType || undefined,
      homepage: orgInfo.homepage || undefined,
      phone: orgInfo.phone || undefined,
      email: orgInfo.email || undefined
    }

    // Only add address if at least one field is filled
    if (orgInfo.street1 || orgInfo.street2 || orgInfo.city || orgInfo.state || orgInfo.zip) {
      org.address = {
        street1: orgInfo.street1 || undefined,
        street2: orgInfo.street2 || undefined,
        city: orgInfo.city || undefined,
        state: orgInfo.state || undefined,
        zip: orgInfo.zip || undefined
      }
    }

    // Ask about gallery images
    const { includeGallery } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'includeGallery',
        message: 'Would you like to add gallery images?',
        default: false
      }
    ])

    if (includeGallery) {
      org.gallery = []
      let addingImages = true

      while (addingImages) {
        const image = await inquirer.prompt([
          {
            type: 'input',
            name: 'url',
            message: 'Enter image URL:',
          },
          {
            type: 'input',
            name: 'caption',
            message: 'Enter image caption:',
          },
          {
            type: 'input',
            name: 'attribution',
            message: 'Enter image attribution:',
          }
        ])

        if (image.url) {
          const imageId = await uploadImage(image.url)
          org.gallery.push({
            _type: 'image',
            _key: faker.string.uuid(),
            asset: {
              _type: 'reference',
              _weak: true,
              _ref: imageId
            },
            caption: image.caption || undefined,
            attribution: image.attribution || undefined
          })
        }

        const { addAnother } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'addAnother',
            message: 'Would you like to add another image?',
            default: false
          }
        ])

        addingImages = addAnother
      }
    }

    settings.organizations = [org]
  }

  return settings
}

// Generate auto-populated settings
async function generateAutoSettings() {
  return {
    _type: 'settings',
    siteTitle: 'Web Experts Collective',
    siteDescription: 'A community of web development and design professionals sharing insights and expertise.',
    organizations: [
      {
        _key: faker.string.uuid(),
        label: 'Main Office',
        name: 'Web Experts Collective',
        localBusinessType: 'ProfessionalService',
        homepage: 'https://webexperts.collective',
        address: {
          street1: faker.location.streetAddress(),
          street2: faker.location.secondaryAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zip: faker.location.zipCode()
        },
        phone: faker.phone.number('+1 ###-###-####'),
        email: 'contact@webexperts.collective',
        gallery: [
          {
            _type: 'image',
            _key: faker.string.uuid(),
            asset: {
              _type: 'reference',
              _weak: true,
              _ref: await uploadImage('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800')
            },
            caption: 'Our office space',
            attribution: 'Unsplash'
          },
          {
            _type: 'image',
            _key: faker.string.uuid(),
            asset: {
              _type: 'reference',
              _weak: true,
              _ref: await uploadImage('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800')
            },
            caption: 'Meeting room',
            attribution: 'Unsplash'
          }
        ]
      }
    ]
  }
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting settings configuration...')
    
    console.log(`📊 Using dataset: ${client.config().dataset}`)
    
    // Ask for confirmation before deleting
    const { shouldDelete } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldDelete',
        message: 'Do you want to delete existing settings before creating new ones?',
        default: false
      }
    ])
    
    if (shouldDelete) {
      await deleteSettings()
    }
    
    console.log('📝 Creating settings...')
    const settings = await getUserSettings()
    const result = await client.create(settings)
    console.log('✅ Created settings')
    
    console.log('🎉 Settings configuration complete!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main() 