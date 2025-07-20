// Convex client configuration and utilities

import { ConvexProvider, ConvexReactClient } from 'convex/react'

// Create a client
export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

// Re-export commonly used types and utilities
export { ConvexProvider }

// Export query and mutation helpers
export { useQuery, useMutation, useAction } from 'convex/react' 