import inquirer from 'inquirer'
import { logInfo } from '../../utils/spinner.mjs'
import dotenv from 'dotenv'

dotenv.config()

export async function createDataset() {
  // Get new dataset name
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter new dataset name:',
      validate: input => {
        if (!input) return 'Dataset name is required'
        if (!/^[a-z0-9-]+$/.test(input)) return 'Dataset name can only contain lowercase letters, numbers, and hyphens'
        return true
      }
    }
  ])
  
  // Show CLI command
  logInfo('\nTo create this dataset, run:')
  logInfo(`npx sanity@latest dataset create "${name}" --project ${process.env.SANITY_STUDIO_PROJECT_ID}`)
  
  // Wait for confirmation
  const { isCreated } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isCreated',
      message: 'Have you created the dataset using the command above?',
      default: false
    }
  ])
  
  if (!isCreated) {
    logInfo('\nPlease create the dataset before continuing.')
    return null
  }
  
  return name
} 