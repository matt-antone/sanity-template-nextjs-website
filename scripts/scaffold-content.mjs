export { scaffoldContent } from './modules/scaffold/index.mjs'

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const { getDatasetChoice } = await import('./utils/dataset.mjs')
  const dataset = await getDatasetChoice()
  scaffoldContent(dataset)
} 