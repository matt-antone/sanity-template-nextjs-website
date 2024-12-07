import { createClient } from '@sanity/client'
import { select } from "@inquirer/prompts"
import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'
import fs from 'fs/promises'
import dotenv from 'dotenv'

export async function changeDataset() {
  let currentSpinner = null
  
  try {
    // Create client
    const client = createClient({
      projectId: process.env.SANITY_STUDIO_PROJECT_ID,
      token: process.env.SANITY_API_WRITE_TOKEN,
      apiVersion: '2023-05-03',
      useCdn: false,
    })
    
    // Get list of existing datasets
    currentSpinner = createSpinner('Loading available datasets...').start()
    const datasets = await client.datasets.list()
    currentSpinner.stop()
    
    // Create choices from existing datasets plus "Create new" option
    const choices = [
      ...datasets.map(d => ({
        value: d.name,
        label: d.name === 'development' ? 'Development' : 'Production'
      })),
      { value: 'create-new', label: '+ Create new dataset' }
    ]
    
    const dataset = await select({
      message: 'Select dataset to use:',
      choices
    })
    
    // If user chose to create new dataset
    if (dataset === 'create-new') {
      const { createDataset } = await import('./index.mjs')
      const newDataset = await createDataset()
      if (!newDataset) {
        return
      }
      await updateEnvDataset(newDataset)
      return
    }
    
    // Update .env with selected dataset
    await updateEnvDataset(dataset)
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nDataset Change Error:')
    logError(error.message)
    throw error
  }
}

async function updateEnvDataset(dataset) {
  const spinner = createSpinner('Updating environment variables...').start()
  
  try {
    // Read current .env
    const envContent = await fs.readFile('.env', 'utf8')
    const env = dotenv.parse(envContent)
    
    // Update both dataset variables
    env.NEXT_PUBLIC_SANITY_DATASET = dataset
    env.SANITY_STUDIO_DATASET = dataset
    
    // Write back to .env
    const newContent = Object.entries(env)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')
    
    await fs.writeFile('.env', newContent)
    spinner.succeed('Updated dataset in .env')
    logSuccess(`Dataset changed to "${dataset}"`)
  } catch (error) {
    spinner.fail()
    throw new Error(`Failed to update .env: ${error.message}`)
  }
} 