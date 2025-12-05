// API request and response types
// Frontend-specific types for API communication with NestJS backend

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  statusCode: number
  error?: string
}

// Authentication types
export interface LoginRequest {
  name: string
  team: string
}

export interface LoginResponse {
  user: {
    id: string
    name: string
    team: string
  }
  token: string
  refreshToken?: string
}

export interface AuthUser {
  id: string
  name: string
  team: string
}

// Profile types
export interface ProfileResponse {
  id: string
  name: string
  team: string
  createdAt: string
  updatedAt: string
}

// Audit types
export interface SaveAuditRequest {
  type: 'Dealer' | 'HOA' | 'Industrial'
  data: unknown // Will be DealerAuditData | HOAAuditData | IndustrialAuditData
}

export interface SaveAuditResponse {
  id: string
  type: 'Dealer' | 'HOA' | 'Industrial'
  summary: string
  createdAt: string
}

export interface SavedAuditResponse {
  id: string
  type: 'Dealer' | 'HOA' | 'Industrial'
  data: unknown
  summary: string
  createdAt: string
}

// Metrics types
export interface WeeklyMetricsResponse {
  dealerAudits: number
  hoaSurveys: number
  industrialMeetings: number
  dealerConversions: number
  newRefillStations: number
  bulkContracts: number
}

export interface UpdateMetricRequest {
  metricKey: keyof WeeklyMetricsResponse
  value: number
}

