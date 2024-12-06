import { faker } from '@faker-js/faker'
import inquirer from 'inquirer'
import { uploadImage } from './utils.mjs'

// Get user input for settings
export async function getUserSettings(client) {
  const { autoPopulate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'autoPopulate',
      message: 'Would you like to auto-populate settings with sample data?',
      default: false
    }
  ])

  if (autoPopulate) {
    return generateAutoSettings(client)
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
      const logoId = await uploadImage(client, siteInfo.logoUrl)
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

    settings.organizations = [org]
  }

  return settings
}

// Generate auto-populated settings
export async function generateAutoSettings(client) {
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
        phone: `+1 ${faker.string.numeric({ length: 10, allowLeadingZeros: false })}`,
        email: 'contact@webexperts.collective'
      }
    ]
  }
} 