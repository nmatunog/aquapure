// Environment variable validation
// Following coding standards: Rule 64, Rule 146

const requiredEnvVars = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
} as const

// Ensure baseUrl doesn't have trailing slash
const normalizeUrl = (url: string): string => {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export const env = {
  apiUrl: normalizeUrl(requiredEnvVars.NEXT_PUBLIC_API_URL),
} as const

// Validate that required environment variables are set
if (typeof window === 'undefined') {
  // Server-side validation
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn('NEXT_PUBLIC_API_URL is not set, using default: http://localhost:3001')
  }
}

