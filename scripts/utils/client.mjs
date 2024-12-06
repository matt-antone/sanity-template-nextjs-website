import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

export function createSanityClient(dataset) {
  return createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: dataset,
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: '2023-05-03',
    useCdn: false,
  })
} 