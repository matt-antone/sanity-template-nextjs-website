export { deployStudio } from './modules/deploy-studio/index.mjs'

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  deployStudio()
}