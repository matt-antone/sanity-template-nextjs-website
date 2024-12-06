import { execSync } from "child_process"
import { select } from "@inquirer/prompts"
import { createSpinner, logSuccess, logError, logInfo } from '../../utils/spinner.mjs'
import { validateEnvVars } from '../../utils/validation.mjs'
import { getEnvironmentConfig } from './environment.mjs'
import { executeDeployment } from './deploy.mjs'

// Validate required environment variables
validateEnvVars([
  'SANITY_STUDIO_PROJECT_ID',
  'SANITY_STUDIO_DEV_SUBDOMAIN',
  'SANITY_STUDIO_PROD_SUBDOMAIN'
])

export async function deployStudio() {
  const spinner = createSpinner("Preparing to deploy Sanity Studio")
  
  try {
    const { environment, subdomain } = await getEnvironmentConfig()
    await executeDeployment(environment, subdomain, spinner)
  } catch (error) {
    spinner.fail()
    logError(`\nError: ${error.message}`)
    process.exit(1)
  }
} 