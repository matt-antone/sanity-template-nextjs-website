#!/usr/bin/env node

import { runCLI } from './modules/cli/index.mjs'
import { setupEnvironment } from './modules/env-setup/index.mjs'
import { validateDataset } from './utils/dataset.mjs'
import { logError, logInfo } from './utils/spinner.mjs'
import inquirer from 'inquirer'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env' })

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    // 1. Always run environment setup first
    await setupEnvironment()
    
    // Reload environment variables after setup
    dotenv.config({ path: '.env' })

    // 2. Now check the configured dataset
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    if (!dataset) {
      throw new Error('NEXT_PUBLIC_SANITY_DATASET was not set during environment setup')
    }

    // 3. Validate dataset exists or guide creation
    let datasetExists = false
    while (!datasetExists) {
      try {
        await validateDataset(dataset)
        datasetExists = true
      } catch (error) {
        logError('\nConfigured dataset does not exist.')
        logInfo('\nTo create it, run:')
        logInfo(`npx sanity@latest dataset create "${dataset}" --project ${process.env.SANITY_STUDIO_PROJECT_ID}`)
        
        const { created } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'created',
            message: 'Have you created the dataset using the command above?',
            default: false
          }
        ])
        
        if (!created) {
          logInfo('\nPlease create the dataset before continuing.')
          process.exit(0)
        }
      }
    }

    // 4. Run CLI with validated environment and dataset
    await runCLI()
  } catch (error) {
    console.error('Failed to start CLI:', error)
    process.exit(1)
  }
}
