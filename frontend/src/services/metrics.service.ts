// Metrics service
// Following coding standards: Rule 30, Rule 31, Rule 57, Rule 58

import { apiClient } from '../lib/api-client'
import type { WeeklyMetrics, UpdateMetricRequest } from '../types/api'

export class MetricsService {
  async getMetrics(): Promise<WeeklyMetrics> {
    const response = await apiClient.get<WeeklyMetrics>('/api/metrics/weekly')
    return response.data
  }

  async updateMetric(metricData: UpdateMetricRequest): Promise<WeeklyMetrics> {
    const response = await apiClient.put<WeeklyMetrics>('/api/metrics/weekly', metricData)
    return response.data
  }
}

export const metricsService = new MetricsService()

