export { setupEnvironment } from './modules/env-setup/index.mjs'

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupEnvironment()
} 