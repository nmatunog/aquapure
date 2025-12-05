// Login DTO with validation
// Following coding standards: Rule 13, Rule 62

import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string

  @IsString()
  @IsNotEmpty()
  team: string
}

