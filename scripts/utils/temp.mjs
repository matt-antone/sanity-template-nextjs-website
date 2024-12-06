import { promises as fs } from 'fs'
import path from 'path'

export async function setupTempDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') throw error
  }
}

export async function cleanup(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true })
  } catch (error) {
    console.warn(`Warning: Failed to clean up temporary directory: ${error.message}`)
  }
} 