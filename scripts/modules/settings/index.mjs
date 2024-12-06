import { createClient } from '@sanity/client'
import inquirer from 'inquirer'
import dotenv from 'dotenv'
import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'
import { getUserSettings, generateAutoSettings } from './input.mjs'
import { deleteSettings } from './delete.mjs'

dotenv.config()

export async function configureSettings(dataset) {
  let currentSpinner = null
  
  try {
    const client = createClient({
      projectId: process.env.SANITY_STUDIO_PROJECT_ID,
      dataset: dataset,
      token: process.env.SANITY_API_WRITE_TOKEN,
      apiVersion: '2023-05-03',
      useCdn: false,
    })

    console.log('🚀 Starting settings configuration...')
    console.log(`📊 Using dataset: ${client.config().dataset}`)
    
    // Check for existing settings
    currentSpinner = createSpinner('Checking for existing settings...').start()
    const existingSettings = await client.fetch(`*[_type == "settings"]`)
    currentSpinner.stop()
    
    if (existingSettings.length > 0) {
      const { shouldDelete } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldDelete',
          message: 'Settings already exist. Would you like to delete and recreate them?',
          default: false
        }
      ])
      
      if (shouldDelete) {
        await deleteSettings(client)
      } else {
        console.log('⚠️  Keeping existing settings')
        return
      }
    }
    
    console.log('📝 Creating settings...')
    const settings = await getUserSettings(client)
    
    currentSpinner = createSpinner('Saving settings...').start()
    await client.create(settings)
    currentSpinner.succeed('Settings created successfully')
    
    console.log('🎉 Settings configuration complete!')
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nSettings Configuration Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error('Failed to configure settings', { cause: error })
  }
} 