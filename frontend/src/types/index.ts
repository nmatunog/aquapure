// Frontend-specific TypeScript types
// No 'any' types allowed - all types must be explicitly defined

export interface UserProfile {
  name: string;
  team: string;
}

export interface DealerAuditData {
  dailyOutput: number;
  sellingPrice: number;
  electricity: number;
  rent: number;
  labor: number;
  maint: number;
  daysOpen: number;
  netProfit?: number;
}

export interface HOAAuditData {
  units: number;
  deliveryRisk: string;
  waterSource: string;
  wastePerUnit: number;
  deliveriesPerUnit: number;
  complaints: number;
}

export interface IndustrialAuditData {
  type: string;
  downtimeCost: number;
  reliability: 'Low' | 'Medium' | 'High';
  repairTime: number;
  risk?: number;
}

export type AuditType = 'Dealer' | 'HOA' | 'Industrial';

export interface SavedAudit {
  id: string;
  type: AuditType;
  data: DealerAuditData | HOAAuditData | IndustrialAuditData;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  } | null;
  summary: string;
  createdAt?: string; // API response format
}

export interface WeeklyMetrics {
  dealerAudits: number;
  hoaSurveys: number;
  industrialMeetings: number;
  dealerConversions: number;
  newRefillStations: number;
  bulkContracts: number;
}

export interface LoginData {
  name: string;
  team: string;
}

export interface ClientTypeOption {
  value: 'dealer' | 'hoa' | 'industrial';
  label: string;
}

export interface MetricCardProps {
  title: string;
  metricKey: keyof WeeklyMetrics;
  target: number;
  color: string;
  metrics: WeeklyMetrics;
  onUpdate: (key: keyof WeeklyMetrics, change: number) => void;
}

export interface PivotItem {
  icon: React.ReactNode;
  title: string;
  from: string;
  to: string;
  strategy: string;
}

