import { execSync } from 'child_process'
import { createSpinner, logSuccess } from '../../utils/spinner.mjs'

export async function importDataset(dataset, exportFile) {
  const spinner = createSpinner(`Importing to ${dataset} dataset...`).start()
  
  try {
    execSync(
      `npx sanity dataset import ${exportFile} ${dataset} --replace`,
      {
        stdio: 'inherit',
        env: {
          ...process.env,
          SANITY_STUDIO_API_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
          SANITY_AUTH_TOKEN: process.env.SANITY_API_WRITE_TOKEN
        }
      }
    )
    spinner.succeed()
    logSuccess(`Imported to ${dataset} dataset`)
  } catch (error) {
    spinner.fail()
    throw error
  }
} 