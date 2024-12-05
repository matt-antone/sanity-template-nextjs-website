import { execSync } from 'child_process'
import path from 'path'
import { getDatasetChoice, getOppositeDataset } from './utils/dataset.mjs'
import { confirmAction } from './utils/confirm.mjs'
import { setupTempDir, cleanup } from './utils/temp.mjs'

const TEMP_DIR = path.join(process.cwd(), 'tmp', 'migration')
const EXPORT_FILE = path.join(TEMP_DIR, 'export.tar.gz')

async function exportDataset(dataset) {
  console.log(`📤 Exporting ${dataset} dataset...`)
  execSync(
    `npx sanity dataset export ${dataset} ${EXPORT_FILE}`,
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        SANITY_STUDIO_API_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
        SANITY_AUTH_TOKEN: process.env.SANITY_API_WRITE_TOKEN
      }
    }
  )
}

async function importDataset(dataset) {
  console.log(`📥 Importing to ${dataset} dataset...`)
  execSync(
    `npx sanity dataset import ${EXPORT_FILE} ${dataset} --replace`,
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        SANITY_STUDIO_API_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
        SANITY_AUTH_TOKEN: process.env.SANITY_API_WRITE_TOKEN
      }
    }
  )
}

async function main() {
  try {
    console.log('🚀 Starting content migration...')
    
    const sourceDataset = await getDatasetChoice('Which dataset would you like to migrate FROM?')
    const targetDataset = getOppositeDataset(sourceDataset)
    
    console.log(`📊 Migrating from ${sourceDataset} to ${targetDataset}`)
    
    const shouldProceed = await confirmAction(
      `This will REPLACE ALL content in the ${targetDataset} dataset with content from ${sourceDataset}. Continue?`
    )
    
    if (!shouldProceed) {
      console.log('❌ Migration cancelled')
      process.exit(0)
    }

    await setupTempDir(TEMP_DIR)
    await exportDataset(sourceDataset)
    await importDataset(targetDataset)
    await cleanup(TEMP_DIR)
    
    console.log('🎉 Content migration complete!')
  } catch (error) {
    console.error('❌ Error during migration:', error)
    await cleanup(TEMP_DIR)
    process.exit(1)
  }
}

main() 