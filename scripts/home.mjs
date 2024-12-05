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
      message: 'Which dataset would you like to configure home page for?',
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

// Delete existing home page
async function deleteHome() {
  const query = `*[_type == "home"]`
  const documents = await client.fetch(query)
  
  if (documents.length > 0) {
    console.log(`🗑️  Deleting existing home page...`)
    await Promise.all(documents.map(doc => client.delete(doc._id)))
    console.log(`✅ Deleted existing home page`)
  }
}

// Get user input for home page
async function getUserHome() {
  const { autoPopulate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'autoPopulate',
      message: 'Would you like to auto-populate the home page with sample data?',
      default: false
    }
  ])

  if (autoPopulate) {
    return generateAutoHome()
  }

  const home = {
    _type: 'home',
    date: new Date().toISOString()
  }

  // Basic Information
  const basicInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter home page title:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter home page description:',
    }
  ])

  home.title = basicInfo.title || undefined
  home.description = basicInfo.description || undefined

  // Sections
  const { includeSections } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeSections',
      message: 'Would you like to add sections?',
      default: true
    }
  ])

  if (includeSections) {
    home.sections = []
    let addingSections = true

    while (addingSections) {
      const section = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter section title:',
        },
        {
          type: 'input',
          name: 'content',
          message: 'Enter section content:',
        }
      ])

      if (section.title || section.content) {
        home.sections.push({
          _key: faker.string.uuid(),
          title: section.title || undefined,
          content: section.content ? [
            {
              _type: 'block',
              style: 'normal',
              _key: faker.string.uuid(),
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  text: section.content,
                  _key: faker.string.uuid(),
                }
              ]
            }
          ] : undefined
        })
      }

      const { addAnother } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'addAnother',
          message: 'Would you like to add another section?',
          default: false
        }
      ])

      addingSections = addAnother
    }
  }

  // Gallery
  const { includeGallery } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeGallery',
      message: 'Would you like to add gallery images?',
      default: false
    }
  ])

  if (includeGallery) {
    home.gallery = []
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
        home.gallery.push({
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

  // Body Content
  const { includeBody } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeBody',
      message: 'Would you like to add body content?',
      default: false
    }
  ])

  if (includeBody) {
    home.body = [
      {
        _type: 'block',
        style: 'normal',
        _key: faker.string.uuid(),
        markDefs: [],
        children: [
          {
            _type: 'span',
            text: await inquirer.prompt([{
              type: 'input',
              name: 'content',
              message: 'Enter body content:',
            }]).then(res => res.content),
            _key: faker.string.uuid(),
          }
        ]
      }
    ]
  }

  return home
}

// Generate auto-populated home page
async function generateAutoHome() {
  const imageId = await uploadImage('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800')
  
  return {
    _type: 'home',
    date: new Date().toISOString(),
    title: 'Welcome to Web Experts Collective',
    description: 'Your partner in creating exceptional web experiences',
    sections: [
      {
        _key: faker.string.uuid(),
        title: 'Our Expertise',
        content: [
          {
            _type: 'block',
            style: 'normal',
            _key: faker.string.uuid(),
            markDefs: [],
            children: [
              {
                _type: 'span',
                text: faker.lorem.paragraph(),
                _key: faker.string.uuid(),
              }
            ]
          }
        ]
      },
      {
        _key: faker.string.uuid(),
        title: 'Our Process',
        content: [
          {
            _type: 'block',
            style: 'normal',
            _key: faker.string.uuid(),
            markDefs: [],
            children: [
              {
                _type: 'span',
                text: faker.lorem.paragraph(),
                _key: faker.string.uuid(),
              }
            ]
          }
        ]
      }
    ],
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: faker.string.uuid(),
        markDefs: [],
        children: [
          {
            _type: 'span',
            text: faker.lorem.paragraphs(3),
            _key: faker.string.uuid(),
          }
        ]
      }
    ],
    gallery: [
      {
        _type: 'image',
        _key: faker.string.uuid(),
        asset: {
          _type: 'reference',
          _weak: true,
          _ref: imageId
        },
        caption: 'Modern workspace',
        attribution: 'Unsplash'
      }
    ]
  }
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting home page configuration...')
    
    console.log(`📊 Using dataset: ${client.config().dataset}`)
    
    // Ask for confirmation before deleting
    const { shouldDelete } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldDelete',
        message: 'Do you want to delete existing home page before creating a new one?',
        default: false
      }
    ])
    
    if (shouldDelete) {
      await deleteHome()
    }
    
    console.log('📝 Creating home page...')
    const home = await getUserHome()
    await client.create(home)
    console.log('✅ Created home page')
    
    console.log('🎉 Home page configuration complete!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main() 