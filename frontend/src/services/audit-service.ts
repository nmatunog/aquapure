// Audit service - API calls to NestJS backend for audit operations

import { get, post } from '@/lib/api-client'
import {
  SaveAuditRequest,
  SaveAuditResponse,
  SavedAuditResponse,
  ApiResponse,
} from '@/types/api'

export const auditService = {
  /**
   * Save an audit to the pipeline
   */
  async saveAudit(
    audit: SaveAuditRequest,
    token: string
  ): Promise<SaveAuditResponse> {
    const response = await post<ApiResponse<SaveAuditResponse>>(
      '/audits',
      audit,
      token
    )
    return response.data
  },

  /**
   * Get all saved audits for the current user
   */
  async getAudits(token: string): Promise<SavedAuditResponse[]> {
    const response = await get<ApiResponse<SavedAuditResponse[]>>(
      '/audits',
      token
    )
    return response.data
  },

  /**
   * Get a specific audit by ID
   */
  async getAuditById(
    auditId: string,
    token: string
  ): Promise<SavedAuditResponse> {
    const response = await get<ApiResponse<SavedAuditResponse>>(
      `/audits/${auditId}`,
      token
    )
    return response.data
  },
}

