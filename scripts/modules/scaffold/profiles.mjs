import { faker } from '@faker-js/faker'
import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'
import { uploadImage } from '../../utils/image.mjs'

const DEFAULT_ROLES = [
  'Senior Frontend Developer',
  'UX Designer',
  'Full Stack Developer',
  'Technical Architect'
]

function generateSocialLinks(username) {
  try {
    return [
      {
        _key: faker.string.uuid(),
        label: 'Twitter',
        url: `https://twitter.com/${username}`
      },
      {
        _key: faker.string.uuid(),
        label: 'GitHub',
        url: `https://github.com/${username}`
      },
      {
        _key: faker.string.uuid(),
        label: 'LinkedIn',
        url: `https://linkedin.com/in/${username}`
      }
    ]
  } catch (error) {
    throw new Error(`Failed to generate social links for "${username}": ${error.message}`)
  }
}

function generateSections() {
  try {
    return [
      {
        _key: faker.string.uuid(),
        heading: 'Bio',
        content: [
          {
            _type: 'block',
            style: 'normal',
            _key: faker.string.uuid(),
            markDefs: [],
            children: [
              {
                _type: 'span',
                text: faker.lorem.paragraphs(2),
                _key: faker.string.uuid(),
              }
            ]
          }
        ]
      },
      {
        _key: faker.string.uuid(),
        heading: 'Education',
        content: [
          {
            _type: 'block',
            style: 'normal',
            _key: faker.string.uuid(),
            markDefs: [],
            children: [
              {
                _type: 'span',
                text: `${faker.company.name()} University - ${faker.person.jobArea()}`,
                _key: faker.string.uuid(),
              }
            ]
          }
        ]
      }
    ]
  } catch (error) {
    throw new Error(`Failed to generate profile sections: ${error.message}`)
  }
}

async function createProfile(client, firstName, lastName, role) {
  try {
    const avatarUrl = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=400`
    
    // Upload avatar
    let imageId
    try {
      imageId = await uploadImage(client, avatarUrl)
    } catch (error) {
      throw new Error(`Failed to upload avatar for "${firstName} ${lastName}": ${error.message}`)
    }
    
    const username = faker.internet.userName({ firstName, lastName })

    return {
      _type: 'profile',
      date: faker.date.past(),
      title: `${firstName} ${lastName}`,
      name: {
        firstName,
        lastName,
        middleName: faker.person.middleName(),
        prefix: Math.random() < 0.3 ? faker.person.prefix() : undefined,
        suffix: Math.random() < 0.3 ? faker.person.suffix() : undefined
      },
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(`${firstName}-${lastName}`).toLowerCase()
      },
      description: faker.lorem.paragraph(),
      email: faker.internet.email({ firstName, lastName }),
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId
        },
        caption: 'Profile photo',
        attribution: 'UI Avatars'
      },
      sections: generateSections(),
      socialLinks: generateSocialLinks(username)
    }
  } catch (error) {
    throw new Error(`Failed to create profile for "${firstName} ${lastName}": ${error.message}`)
  }
}

export async function generateProfiles(client) {
  let currentSpinner = null
  
  try {
    currentSpinner = createSpinner('Creating profiles...').start()
    
    // Generate profile data
    const profilesData = DEFAULT_ROLES.map(role => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role
    }))
    
    // Create profiles in batches
    const BATCH_SIZE = 2 // Smaller batch size due to image uploads
    const savedProfiles = []
    
    for (let i = 0; i < profilesData.length; i += BATCH_SIZE) {
      const batch = profilesData.slice(i, i + BATCH_SIZE)
      currentSpinner.text = `Creating profiles (${i + 1}-${Math.min(i + BATCH_SIZE, profilesData.length)}/${profilesData.length})...`
      
      try {
        // Create profile documents
        const profiles = await Promise.all(
          batch.map(({ firstName, lastName, role }) => 
            createProfile(client, firstName, lastName, role)
          )
        )
        
        // Save to Sanity
        const batchResults = await Promise.all(
          profiles.map(profile => client.create(profile).catch(error => {
            throw new Error(`Failed to save profile "${profile.title}": ${error.message}`)
          }))
        )
        
        savedProfiles.push(...batchResults)
      } catch (error) {
        throw new Error(`Failed to process batch of profiles: ${error.message}`)
      }
    }
    
    currentSpinner.succeed()
    logSuccess(`Created ${savedProfiles.length} profiles`)
    return savedProfiles
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nProfile Generation Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error(`Profile generation failed: ${error.message}`)
  }
} 