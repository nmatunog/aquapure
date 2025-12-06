// Update Metric DTO
// Following coding standards: Rule 13, Rule 18, Rule 19

import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator'

const validMetricKeys = [
  'dealerAudits',
  'hoaSurveys',
  'industrialMeetings',
  'dealerConversions',
  'newRefillStations',
  'bulkContracts',
] as const

export class UpdateMetricDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(validMetricKeys)
  metricKey: string

  @IsNumber()
  @IsNotEmpty()
  value: number
}

