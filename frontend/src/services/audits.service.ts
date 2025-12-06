// Audits service
// Following coding standards: Rule 30, Rule 31, Rule 57, Rule 58

import { apiClient } from '../lib/api-client'
import type { CreateAuditRequest, Audit } from '../types/api'

export class AuditsService {
  async create(auditData: CreateAuditRequest): Promise<Audit> {
    const response = await apiClient.post<Audit>('/api/audits', auditData)
    return response.data
  }

  async findAll(): Promise<Audit[]> {
    const response = await apiClient.get<Audit[]>('/api/audits')
    return response.data
  }

  async findOne(id: string): Promise<Audit> {
    const response = await apiClient.get<Audit>(`/api/audits/${id}`)
    return response.data
  }
}

export const auditsService = new AuditsService()

