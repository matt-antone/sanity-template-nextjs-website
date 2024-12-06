import inquirer from 'inquirer'
import { createSpinner, logSuccess, logError, logInfo } from '../../utils/spinner.mjs'
import { getDatasetChoice, validateDataset } from '../../utils/dataset.mjs'
import { setupChoices, handleSetupChoice } from './actions.mjs'
import dotenv from 'dotenv'
import { validateEnvVars } from '../../utils/validation.mjs'
import { setupEnvironment } from '../env-setup/index.mjs'

// Only load .env file, not .env.local etc.
dotenv.config({ path: '.env' })

export async function setupWizard() {
  let currentSpinner = null
  
  try {
    logInfo('\nStarting setup wizard...')
    
    // Get user action first
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: setupChoices
      }
    ])

    // If action is env setup, run it directly
    if (action === 'env') {
      await setupEnvironment()
      // Reload environment variables after setup
      dotenv.config({ path: '.env' })
      return
    }

    // For other actions, check environment variables
    const required = ['SANITY_STUDIO_PROJECT_ID', 'SANITY_API_WRITE_TOKEN']
    if (!validateEnvVars(required)) {
      logInfo('\nEnvironment variables need to be set up first.')
      await setupEnvironment()
      // Reload environment variables after setup
      dotenv.config({ path: '.env' })
      
      // Check again after setup
      if (!validateEnvVars(required)) {
        throw new Error('Required environment variables are still missing after setup')
      }
    }

    // Get and validate dataset
    const dataset = await getDatasetChoice('Select dataset to work with:')
    await validateDataset(dataset)

    currentSpinner = createSpinner('Processing your request...').start()
    currentSpinner.stop()
    
    await handleSetupChoice(action, dataset)
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nSetup Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    logInfo('\nTry running the command again or check your configuration.')
    process.exit(1)
  }
} 