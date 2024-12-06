import { createSpinner, logSuccess } from '../../utils/spinner.mjs'

export async function deleteHome(client) {
  const spinner = createSpinner('Deleting existing home page...').start()
  const query = `*[_type == "home"]`
  const documents = await client.fetch(query)
  
  if (documents.length > 0) {
    await Promise.all(documents.map(doc => client.delete(doc._id)))
    spinner.succeed()
    logSuccess('Deleted existing home page')
  } else {
    spinner.stop()
  }
} 