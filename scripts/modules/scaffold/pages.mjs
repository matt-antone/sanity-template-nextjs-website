import { faker } from '@faker-js/faker'
import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'
import { uploadImage } from '../../utils/image.mjs'
import { generateStructuredContent } from './content.mjs'

// Predefined image URLs for pages
const PAGE_IMAGES = [
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&h=1080',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080',
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=1080',
  'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1920&h=1080'
]

const DEFAULT_PAGES = [
  'About Us',
  'Services',
  'Contact',
  'Privacy Policy',
  'Our Team',
  'Case Studies'
]

async function createPage(client, profiles, title, index) {
  try {
    // Upload image
    let imageId
    try {
      imageId = await uploadImage(client, PAGE_IMAGES[index % PAGE_IMAGES.length])
    } catch (error) {
      throw new Error(`Failed to upload image for page "${title}": ${error.message}`)
    }
    
    // Generate content
    let body
    try {
      body = title === 'Privacy Policy' 
        ? generateStructuredContent('privacy')
        : generateStructuredContent('page', title)
    } catch (error) {
      throw new Error(`Failed to generate content for page "${title}": ${error.message}`)
    }
    
    // Create page document
    return {
      _type: 'page',
      date: faker.date.past(),
      title,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(title).toLowerCase()
      },
      description: faker.lorem.paragraph(),
      relatedProfiles: [
        {
          _type: 'reference',
          _key: faker.string.uuid(),
          _weak: true,
          _ref: profiles[Math.floor(Math.random() * profiles.length)]._id
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
          caption: `${title} header image`,
          attribution: 'Unsplash'
        }
      ],
      body
    }
  } catch (error) {
    throw new Error(`Failed to create page "${title}": ${error.message}`)
  }
}

export async function generatePages(client, profiles) {
  let currentSpinner = null
  
  try {
    currentSpinner = createSpinner('Creating pages...').start()
    
    // Validate input references
    if (!profiles?.length) throw new Error('No profiles available')
    
    const pages = []
    const BATCH_SIZE = 2 // Process pages in smaller batches
    
    // Create pages in batches
    for (let i = 0; i < DEFAULT_PAGES.length; i += BATCH_SIZE) {
      const batchSize = Math.min(BATCH_SIZE, DEFAULT_PAGES.length - i)
      const batchPromises = []
      
      for (let j = 0; j < batchSize; j++) {
        const index = i + j
        const title = DEFAULT_PAGES[index]
        currentSpinner.text = `Creating page "${title}" (${index + 1}/${DEFAULT_PAGES.length})...`
        
        try {
          const page = await createPage(client, profiles, title, index)
          const createPromise = client.create(page).catch(error => {
            throw new Error(`Failed to save page "${title}": ${error.message}`)
          })
          batchPromises.push(createPromise)
        } catch (error) {
          throw new Error(`Failed to process page "${title}": ${error.message}`)
        }
      }
      
      try {
        const batchResults = await Promise.all(batchPromises)
        pages.push(...batchResults)
      } catch (error) {
        throw new Error(`Failed to save batch of pages: ${error.message}`)
      }
      
      currentSpinner.text = `Created ${pages.length}/${DEFAULT_PAGES.length} pages`
    }
    
    currentSpinner.succeed()
    logSuccess(`Created ${pages.length} pages`)
    return pages
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nPage Generation Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error(`Page generation failed: ${error.message}`)
  }
} 