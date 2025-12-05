// Authentication service - API calls to NestJS backend
// Uses JWT tokens for authentication as per coding standards

import { get, post } from '@/lib/api-client'
import {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  ApiResponse,
} from '@/types/api'

export const authService = {
  /**
   * Login user and get JWT token
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    )
    return response.data
  },

  /**
   * Get current user profile
   */
  async getProfile(token: string): Promise<ProfileResponse> {
    const response = await get<ApiResponse<ProfileResponse>>(
      '/auth/profile',
      token
    )
    return response.data
  },

  /**
   * Create or update user profile
   */
  async updateProfile(
    profile: LoginRequest,
    token: string
  ): Promise<ProfileResponse> {
    const response = await post<ApiResponse<ProfileResponse>>(
      '/auth/profile',
      profile,
      token
    )
    return response.data
  },

  /**
   * Refresh JWT token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await post<ApiResponse<{ token: string }>>(
      '/auth/refresh',
      { refreshToken }
    )
    return response.data
  },

  /**
   * Logout user (invalidate token on backend)
   */
  async logout(token: string): Promise<void> {
    await post('/auth/logout', {}, token)
  },
}

