import { createSpinner, logSuccess } from '../../utils/spinner.mjs'

export async function deleteNavigation(client) {
  const spinner = createSpinner('Deleting existing navigation...').start()
  const query = `*[_type == "navigation"]`
  const documents = await client.fetch(query)
  
  if (documents.length > 0) {
    await Promise.all(documents.map(doc => client.delete(doc._id)))
    spinner.succeed()
    logSuccess('Deleted existing navigation')
  } else {
    spinner.stop()
  }
} 