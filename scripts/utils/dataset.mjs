import { select } from "@inquirer/prompts"
import { createClient } from '@sanity/client'
import { createSpinner, logSuccess, logError, logInfo } from './spinner.mjs'
import dotenv from 'dotenv'

// Only load .env file, not .env.local etc.
dotenv.config({ path: '.env' })

// Helper function to create Sanity client
function createSanityClient(dataset = null) {
  return createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: dataset,
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: '2023-05-03',
    useCdn: false,
  })
}

export async function getDatasetChoice(message = 'Select dataset:') {
  const spinner = createSpinner('Loading available datasets...').start()
  
  try {
    // Create client without dataset to list all datasets
    const client = createSanityClient()
    
    // Get list of existing datasets
    const datasets = await client.datasets.list()
    spinner.stop()
    
    // Create choices from existing datasets plus "Create new" option
    const choices = [
      ...datasets.map(d => ({
        value: d.name,
        label: d.name === 'development' ? 'Development' : 'Production'
      })),
      { value: 'create-new', label: '+ Create new dataset' }
    ]
    
    const dataset = await select({
      message,
      choices,
      default: 'development'
    })
    
    // If user chose to create new dataset
    if (dataset === 'create-new') {
      const { createDataset } = await import('../modules/dataset/index.mjs')
      const newDataset = await createDataset()
      
      if (!newDataset) {
        // If user didn't create dataset, show dataset selection again
        return getDatasetChoice(message)
      }
      
      return newDataset
    }
    
    return dataset
  } catch (error) {
    spinner.fail()
    throw new Error(`Failed to load datasets: ${error.message}`)
  }
}

export async function validateDataset(dataset) {
  // Create client with specific dataset
  const client = createSanityClient(dataset)
  
  // Get list of datasets
  const datasets = await client.datasets.list()
  const exists = datasets.find(d => d.name === dataset)
  
  if (!exists) {
    throw new Error('Dataset does not exist')
  }
  
  return true
}

export function getOppositeDataset(dataset) {
  return dataset === 'production' ? 'development' : 'production'
} 