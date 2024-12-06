export { configureHome } from './modules/home/index.mjs'

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const { getDatasetChoice } = await import('./utils/dataset.mjs')
  const dataset = await getDatasetChoice()
  configureHome(dataset)
} 