// API response types
// Following coding standards: Rule 30, Rule 31, Rule 57

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ApiError {
  message: string
  statusCode?: number
  error?: string
}

// Auth types
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

export interface UserProfile {
  id: string
  name: string
  team: string
  createdAt: string
  updatedAt: string
}

// Audit types
export interface CreateAuditRequest {
  type: string
  data: Record<string, unknown>
  summary: string
}

export interface Audit {
  id: string
  type: string
  data: Record<string, unknown>
  summary: string
  createdAt: string
}

// Metrics types
export interface WeeklyMetrics {
  dealerAudits: number
  hoaSurveys: number
  industrialMeetings: number
  dealerConversions: number
  newRefillStations: number
  bulkContracts: number
}

export interface UpdateMetricRequest {
  metricKey: keyof WeeklyMetrics
  value: number
}

