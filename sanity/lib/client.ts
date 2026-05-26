import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Read-only client for general queries
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for SSG/ISR support
})

// Write client for creating comments (uses API token)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for writes
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN, // API token with write permissions
})
