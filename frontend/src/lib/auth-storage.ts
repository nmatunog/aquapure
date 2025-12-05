// Client-side token storage utilities
// Uses localStorage for JWT token persistence

const TOKEN_KEY = 'aquapure_auth_token'
const REFRESH_TOKEN_KEY = 'aquapure_refresh_token'
const PROFILE_KEY = 'aquapure_profile'

export const authStorage = {
  /**
   * Store JWT token
   */
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token)
    }
  },

  /**
   * Get JWT token
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  },

  /**
   * Store refresh token
   */
  setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(REFRESH_TOKEN_KEY, token)
    }
  },

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY)
    }
    return null
  },

  /**
   * Store user profile
   */
  setProfile(profile: unknown): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    }
  },

  /**
   * Get user profile
   */
  getProfile<T>(): T | null {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem(PROFILE_KEY)
      return profile ? JSON.parse(profile) : null
    }
    return null
  },

  /**
   * Clear all auth data
   */
  clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(PROFILE_KEY)
    }
  },
}

