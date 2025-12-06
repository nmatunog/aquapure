// Application types
// Following coding standards: Rule 30, Rule 31

export interface UserProfile {
  id: string
  name: string
  team: string
  createdAt: string
  updatedAt: string
}

export interface WeeklyMetrics {
  dealerAudits: number
  hoaSurveys: number
  industrialMeetings: number
  dealerConversions: number
  newRefillStations: number
  bulkContracts: number
}

export interface DealerAuditData {
  dailyOutput: number
  sellingPrice: number
  electricity: number
  rent: number
  labor: number
  maint: number
  daysOpen: number
  netProfit?: number
}

export interface HOAAuditData {
  units: number
  deliveryRisk: string
  waterSource: string
  wastePerUnit: number
  deliveriesPerUnit: number
  complaints: number
}

export interface IndustrialAuditData {
  type: string
  downtimeCost: number
  reliability: string
  repairTime: number
  risk?: number
}

export type AuditData = DealerAuditData | HOAAuditData | IndustrialAuditData

export interface SavedAudit {
  id: string
  type: 'Dealer' | 'HOA' | 'Industrial'
  data: AuditData
  summary: string
  createdAt: string
}

export type ClientType = 'dealer' | 'hoa' | 'industrial'

export type ViewType = 'workshop' | 'audit' | 'scorecard' | 'reports'

