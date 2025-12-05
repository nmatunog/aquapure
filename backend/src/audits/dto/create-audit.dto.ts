// Create Audit DTO
// Following coding standards: Rule 13, Rule 62

import { IsString, IsNotEmpty, IsObject, IsIn } from 'class-validator'

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

