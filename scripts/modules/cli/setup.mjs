import inquirer from 'inquirer'
import { createSpinner, logSuccess, logError, logInfo } from '../../utils/spinner.mjs'
import { setupChoices, handleSetupChoice } from './actions.mjs'
import dotenv from 'dotenv'

// Only load .env file, not .env.local etc.
dotenv.config({ path: '.env' })

export async function setupWizard() {
  let currentSpinner = null
  
  try {
    // Get user action
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: setupChoices
      }
    ])

    currentSpinner = createSpinner('Processing your request...').start()
    currentSpinner.stop()
    
    await handleSetupChoice(action, process.env.NEXT_PUBLIC_SANITY_DATASET)
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('Setup Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    logInfo('Try running the command again or check your configuration.')
    process.exit(1)
  }
} 