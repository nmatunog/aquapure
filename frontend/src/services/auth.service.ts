// Authentication service
// Following coding standards: Rule 30, Rule 31, Rule 57, Rule 58

import { apiClient } from '../lib/api-client'
import type { LoginRequest, LoginResponse, UserProfile } from '../types/api'

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials)
    
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token)
    }
    
    return response.data
  }

  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/api/auth/profile')
    return response.data
  }

  async updateProfile(profileData: LoginRequest): Promise<UserProfile> {
    const response = await apiClient.post<UserProfile>('/api/auth/profile', profileData)
    return response.data
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/api/auth/logout')
    } catch (error) {
      // Logout should succeed even if API call fails
      console.error('Logout API call failed:', error)
    } finally {
      apiClient.setToken(null)
    }
  }

  isAuthenticated(): boolean {
    return apiClient.getToken() !== null
  }
}

export const authService = new AuthService()

