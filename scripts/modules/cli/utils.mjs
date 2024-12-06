import { getDatasetChoice } from '../../utils/dataset.mjs'
import { logError } from '../../utils/spinner.mjs'

export async function runWithDataset(callback) {
  try {
    const dataset = await getDatasetChoice('Select dataset to work with:')
    await callback(dataset)
  } catch (error) {
    logError('Operation failed:', error)
    process.exit(1)
  }
} 