import { createSpinner, logSuccess } from '../../utils/spinner.mjs'

export async function deleteSettings(client) {
  const spinner = createSpinner('Checking for existing settings...').start()
  try {
    const query = `*[_type == "settings"]`
    const documents = await client.fetch(query)
    
    if (documents.length > 0) {
      spinner.text = 'Deleting existing settings...'
      await Promise.all(documents.map(doc => client.delete(doc._id)))
      spinner.succeed('Deleted existing settings')
    } else {
      spinner.succeed('No existing settings found')
    }
  } catch (error) {
    spinner.fail()
    throw new Error(`Failed to delete settings: ${error.message}`)
  }
} 