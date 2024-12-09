import inquirer from 'inquirer'
import fs from 'fs/promises'
import { createSpinner, logSuccess, logError, logInfo } from '../../utils/spinner.mjs'
import dotenv from 'dotenv'

// Only load .env file, not .env.local etc.
dotenv.config({ path: '.env' })

// Helper function to truncate long values
function truncateValue(value, maxLength = 30) {
  if (!value || typeof value !== 'string') return value
  return value.length > maxLength ? 
    value.slice(0, maxLength - 3) + '...' : 
    value
}

// Helper function to mask sensitive values
function maskValue(value) {
  if (!value || typeof value !== 'string') return value
  if (value.toLowerCase().includes('token')) {
    return '*'.repeat(Math.min(value.length, 10))
  }
  return truncateValue(value)
}

// Define all possible env vars and their prompts
const ENV_VARS = [
  {
    key: 'SANITY_STUDIO_PROJECT_ID',
    message: 'Enter your Sanity project ID:',
    required: true,
    related: ['NEXT_PUBLIC_SANITY_PROJECT_ID']  // Variables that should get the same value
  },
  {
    key: 'SANITY_STUDIO_DATASET',
    message: 'Enter your Sanity dataset name:',
    default: 'development',
    required: true,
    related: ['NEXT_PUBLIC_SANITY_DATASET']  // Variables that should get the same value
  },
  {
    key: 'SANITY_API_WRITE_TOKEN',
    message: 'Enter your Sanity write token:',
    required: true
  },
  {
    key: 'SANITY_API_READ_TOKEN',
    message: 'Enter your Sanity read token:',
    required: true
  },
  {
    key: 'NEXT_PUBLIC_NAME',
    message: 'Enter your site name:',
    default: 'My Sanity Site'
  },
  {
    key: 'VERCEL_PRODUCTION_URL',
    message: 'Enter your local development URL:',
    default: 'https://localhost:3000'
  },
  {
    key: 'NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID',
    message: 'Enter your Google Analytics ID:',
    optional: true
  }
]

export async function setupEnvironment() {
  let spinner = null
  
  try {
    logInfo('Setting up environment variables...')
    
    // Check for existing .env
    const envExists = await fs.access('.env').then(() => true).catch(() => false)
    
    // Load existing env if it exists
    let currentEnv = {}
    if (envExists) {
      currentEnv = dotenv.parse(await fs.readFile('.env', 'utf8'))
      logInfo('Found existing .env file')
    }
    
    // Build prompts for missing vars
    const prompts = []
    
    for (const { key, message, required, default: defaultValue, optional } of ENV_VARS) {
      // Skip related variables - they'll be set after collection
      if (key.startsWith('NEXT_PUBLIC_') && key !== 'NEXT_PUBLIC_NAME' && key !== 'NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID') {
        continue
      }
      
      // If value exists, show it in the message
      const existingValue = currentEnv[key]
      const displayValue = key.toLowerCase().includes('token') ? 
        maskValue(existingValue) : 
        truncateValue(existingValue)
      
      const promptMessage = existingValue ? 
        `${message} (current: ${displayValue})` : 
        message
      
      prompts.push({
        type: 'input',
        name: key,
        message: promptMessage,
        default: existingValue || defaultValue || '',
        validate: required ? 
          input => input ? true : `${key} is required` : 
          undefined
      })
    }
    
    // Get answers for missing vars
    const answers = await inquirer.prompt(prompts)
    
    // Start spinner for file operations
    spinner = createSpinner('Updating environment variables...').start()
    
    // Combine with existing env
    const envVars = {
      ...currentEnv,  // Keep existing values
      ...Object.fromEntries(  // Only update values that were actually changed
        Object.entries(answers).filter(([key, value]) => 
          value !== currentEnv[key] && value !== ''
        )
      )
    }
    
    // Add related values
    ENV_VARS.forEach(({ key, related }) => {
      if (related && envVars[key]) {
        related.forEach(relatedKey => {
          envVars[relatedKey] = envVars[key]
        })
      }
    })
    
    // Write new .env
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')
    
    await fs.writeFile('.env', envContent + '\n')
    spinner.succeed('Environment variables updated')
    
    // Reload environment variables
    dotenv.config({ path: '.env' })
    
    logSuccess('Environment setup complete!')
  } catch (error) {
    if (spinner) spinner.fail()
    logError('Failed to setup environment:', error)
    process.exit(1)
  }
} 