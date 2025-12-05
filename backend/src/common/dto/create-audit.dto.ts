// Create Audit DTO - Request validation
// Following coding standards: Rule 13, Rule 18

import { IsString, IsNotEmpty, IsIn, IsObject } from 'class-validator'

export class CreateAuditDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['Dealer', 'HOA', 'Industrial'])
  type: 'Dealer' | 'HOA' | 'Industrial'

  @IsObject()
  @IsNotEmpty()
  data: Record<string, unknown>

  @IsString()
  @IsNotEmpty()
  summary: string
}

