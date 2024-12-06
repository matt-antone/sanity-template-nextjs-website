import { execSync } from "child_process"
import { logSuccess, logInfo } from '../../utils/spinner.mjs'

export async function executeDeployment(environment, subdomain, spinner) {
  spinner.start(`Deploying Sanity Studio to ${environment} environment...`)

  try {
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = environment

    execSync(`npx sanity deploy --project=${process.env.SANITY_STUDIO_PROJECT_ID} --dataset=${environment}`, {
      stdio: 'inherit',
      env: { 
        ...process.env, 
        NODE_ENV: environment,
        SANITY_STUDIO_DATASET: environment
      }
    })

    process.env.NODE_ENV = originalNodeEnv

    spinner.succeed()
    logSuccess(`Successfully deployed Sanity Studio to ${environment} environment!`)
    logInfo(`\nYour studio is now deployed to https://${subdomain}.sanity.studio/`)
  } catch (error) {
    throw new Error(`Failed to deploy: ${error.message}`)
  }
} 