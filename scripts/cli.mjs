#!/usr/bin/env node

import { runCLI } from './modules/cli/index.mjs'
import { validateEnvVars } from './utils/validation.mjs'
import { setupEnvironment } from './modules/env-setup/index.mjs'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env' })

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const required = ['SANITY_STUDIO_PROJECT_ID', 'SANITY_API_WRITE_TOKEN']
    
    // Check if env vars exist
    if (!validateEnvVars(required)) {
      await setupEnvironment()
      // Reload environment variables after setup
      dotenv.config({ path: '.env' })
      // Verify setup was successful
      if (!validateEnvVars(required)) {
        console.error('Required environment variables are still missing after setup')
        process.exit(1)
      }
    }
    
    await runCLI()
  } catch (error) {
    console.error('Failed to start CLI:', error)
    process.exit(1)
  }
}
