// Update Metric DTO
// Following coding standards: Rule 13, Rule 62

import { IsString, IsNotEmpty, IsNumber, IsIn, Min } from 'class-validator'

const METRIC_KEYS = [
  'dealerAudits',
  'hoaSurveys',
  'industrialMeetings',
  'dealerConversions',
  'newRefillStations',
  'bulkContracts',
] as const

export type MetricKey = (typeof METRIC_KEYS)[number]

export class UpdateMetricDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(METRIC_KEYS)
  metricKey: MetricKey

  @IsNumber()
  @Min(0)
  value: number
}

