// Metrics service - API calls to NestJS backend for scorecard metrics

import { get, put } from '@/lib/api-client'
import {
  WeeklyMetricsResponse,
  UpdateMetricRequest,
  ApiResponse,
} from '@/types/api'

export const metricsService = {
  /**
   * Get current weekly metrics for the user
   */
  async getMetrics(token: string): Promise<WeeklyMetricsResponse> {
    const response = await get<ApiResponse<WeeklyMetricsResponse>>(
      '/metrics/weekly',
      token
    )
    return response.data
  },

  /**
   * Update a specific metric
   */
  async updateMetric(
    update: UpdateMetricRequest,
    token: string
  ): Promise<WeeklyMetricsResponse> {
    const response = await put<ApiResponse<WeeklyMetricsResponse>>(
      '/metrics/weekly',
      update,
      token
    )
    return response.data
  },
}

