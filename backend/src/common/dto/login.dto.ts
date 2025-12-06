// Login DTO
// Following coding standards: Rule 13, Rule 18, Rule 19

import { IsString, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  team: string
}

