import { faker } from '@faker-js/faker'
import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'

const DEFAULT_TAGS = [
  'JavaScript', 'React', 'Next.js', 'TypeScript', 
  'CSS', 'HTML', 'Node.js', 'API', 'Testing', 'UI/UX'
]

function createTag(name) {
  try {
    return {
      _type: 'tag',
      title: name,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(name).toLowerCase()
      },
      description: faker.lorem.sentence()
    }
  } catch (error) {
    throw new Error(`Failed to create tag "${name}": ${error.message}`)
  }
}

export async function generateTags(client) {
  let currentSpinner = createSpinner('Creating tags...').start()
  
  try {
    // Create tag documents
    let tags
    try {
      tags = DEFAULT_TAGS.map(createTag)
    } catch (error) {
      throw new Error(`Failed to generate tag documents: ${error.message}`)
    }
    
    // Save tags in batches
    const BATCH_SIZE = 5
    const savedTags = []
    
    for (let i = 0; i < tags.length; i += BATCH_SIZE) {
      const batch = tags.slice(i, i + BATCH_SIZE)
      currentSpinner.text = `Creating tags (${i + 1}-${Math.min(i + BATCH_SIZE, tags.length)}/${tags.length})...`
      
      try {
        const batchResults = await Promise.all(
          batch.map(tag => client.create(tag).catch(error => {
            throw new Error(`Failed to create tag "${tag.title}": ${error.message}`)
          }))
        )
        savedTags.push(...batchResults)
      } catch (error) {
        throw new Error(`Failed to save batch of tags: ${error.message}`)
      }
    }
    
    currentSpinner.succeed('Tags created successfully')
    logSuccess(`Created ${savedTags.length} tags`)
    return savedTags
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('Tag Generation Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error(`Tag generation failed: ${error.message}`)
  }
} 