// Create Audit DTO
// Following coding standards: Rule 13, Rule 18, Rule 19

import { IsString, IsNotEmpty, IsObject } from 'class-validator'

export class CreateAuditDto {
  @IsString()
  @IsNotEmpty()
  type: string

  @IsObject()
  @IsNotEmpty()
  data: Record<string, unknown>

  @IsString()
  @IsNotEmpty()
  summary: string
}

