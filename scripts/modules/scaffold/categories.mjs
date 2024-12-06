import { faker } from '@faker-js/faker'
import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'

const DEFAULT_CATEGORIES = [
  'Web Development',
  'UX Design',
  'Performance',
  'Accessibility',
  'DevOps'
]

function createCategory(name) {
  try {
    return {
      _type: 'category',
      title: name,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(name).toLowerCase()
      },
      description: faker.lorem.sentence()
    }
  } catch (error) {
    throw new Error(`Failed to create category "${name}": ${error.message}`)
  }
}

export async function generateCategories(client) {
  let currentSpinner = null
  
  try {
    currentSpinner = createSpinner('Creating categories...').start()
    
    // Create category documents
    let categories
    try {
      categories = DEFAULT_CATEGORIES.map(createCategory)
    } catch (error) {
      throw new Error(`Failed to generate category documents: ${error.message}`)
    }
    
    // Save categories in batches
    const BATCH_SIZE = 5
    const savedCategories = []
    
    for (let i = 0; i < categories.length; i += BATCH_SIZE) {
      const batch = categories.slice(i, i + BATCH_SIZE)
      currentSpinner.text = `Creating categories (${i + 1}-${Math.min(i + BATCH_SIZE, categories.length)}/${categories.length})...`
      
      try {
        const batchResults = await Promise.all(
          batch.map(category => client.create(category).catch(error => {
            throw new Error(`Failed to create category "${category.title}": ${error.message}`)
          }))
        )
        savedCategories.push(...batchResults)
      } catch (error) {
        throw new Error(`Failed to save batch of categories: ${error.message}`)
      }
    }
    
    currentSpinner.succeed()
    logSuccess(`Created ${savedCategories.length} categories`)
    return savedCategories
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nCategory Generation Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error(`Category generation failed: ${error.message}`)
  }
} 