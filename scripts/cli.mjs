#!/usr/bin/env node

import { runCLI } from './modules/cli/index.mjs'
import { setupEnvironment } from './modules/env-setup/index.mjs'
import { validateDataset } from './utils/dataset.mjs'
import { logError, logInfo, logSuccess, createSpinner } from './utils/spinner.mjs'
import inquirer from 'inquirer'
import dotenv from 'dotenv'
import fs from 'fs/promises'

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    // 1. Check if .env exists and run setup if it doesn't
    const envExists = await fs.access('.env').then(() => true).catch(() => false)
    if (!envExists) {
      await setupEnvironment()
    }
    logSuccess('Environment (.env) file exists.')
    
    // Load environment variables
    dotenv.config({ path: '.env' })

    // 2. Now check the configured dataset
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    if (!dataset) {
      throw new Error('NEXT_PUBLIC_SANITY_DATASET was not set during environment setup')
    }

    // 3. Validate dataset exists or guide creation
    let datasetExists = false
    let currentSpinner = createSpinner('Checking dataset...').start()
    
    while (!datasetExists) {
      try {
        await validateDataset(dataset)
        datasetExists = true
        currentSpinner.succeed(`Dataset "${dataset}" exists`)
      } catch (error) {
        currentSpinner.fail()
        logError('Configured dataset does not exist.')
        logInfo('To create it, run:')
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
          logInfo('Please create the dataset before continuing.')
          process.exit(0)
        }
        currentSpinner = createSpinner('Checking dataset...').start()
      }
    }

    // 4. Run CLI with validated environment and dataset
    await runCLI()
  } catch (error) {
    console.error('Failed to start CLI:', error)
    process.exit(1)
  }
}
