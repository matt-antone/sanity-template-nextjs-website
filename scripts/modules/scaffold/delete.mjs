import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'

export async function deleteAllContent(client) {
  const types = ['post', 'page', 'profile', 'category', 'tag']
  let currentSpinner = createSpinner('Deleting content...').start()
  
  try {
    for (const type of types) {
      currentSpinner.text = `Deleting ${type}s...`
      
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
          logSuccess(`Deleted ${documents.length} ${plural}`)
        } else {
          logInfo(`No ${type}s to delete`)
        }
      } catch (error) {
        throw new Error(`Error processing ${type}s: ${error.message}`)
      }
    }
    currentSpinner.succeed('Content deletion complete')
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('Deletion Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error(`Content deletion failed: ${error.message}`)
  }
} 