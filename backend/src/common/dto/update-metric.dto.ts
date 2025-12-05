// Update Metric DTO - Request validation
// Following coding standards: Rule 13, Rule 18

import { IsString, IsNotEmpty, IsIn, IsNumber, Min } from 'class-validator'

export class UpdateMetricDto {
  @IsString()
  @IsNotEmpty()
  @IsIn([
    'dealerAudits',
    'hoaSurveys',
    'industrialMeetings',
    'dealerConversions',
    'newRefillStations',
    'bulkContracts',
  ])
  metricKey: string

  @IsNumber()
  @Min(0)
  value: number
}

