import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'

export async function deleteAllContent(client) {
  const types = ['post', 'page', 'profile', 'category', 'tag']
  let currentSpinner = null
  
  try {
    for (const type of types) {
      currentSpinner = createSpinner(`Deleting ${type}s...`).start()
      
      try {
        // Fetch documents
        const query = `*[_type == "${type}"]`
        const documents = await client.fetch(query).catch(error => {
          throw new Error(`Failed to fetch ${type} documents: ${error.message}`)
        })
        
        if (documents.length > 0) {
          // Delete documents in batches to avoid timeout
          const batchSize = 50
          for (let i = 0; i < documents.length; i += batchSize) {
            const batch = documents.slice(i, i + batchSize)
            currentSpinner.text = `Deleting ${type}s (${i + 1}-${Math.min(i + batchSize, documents.length)}/${documents.length})...`
            
            try {
              await Promise.all(
                batch.map(doc => client.delete(doc._id))
              )
            } catch (error) {
              throw new Error(`Failed to delete batch of ${type}s: ${error.message}`)
            }
          }
          
          const plural = type === 'category' ? 'categories' : `${type}s`
          currentSpinner.succeed()
          logSuccess(`Deleted ${documents.length} ${plural}`)
        } else {
          currentSpinner.succeed(`No ${type}s to delete`)
        }
      } catch (error) {
        currentSpinner.fail()
        throw new Error(`Error processing ${type}s: ${error.message}`)
      }
    }
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nDeletion Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error(`Content deletion failed: ${error.message}`)
  }
} 