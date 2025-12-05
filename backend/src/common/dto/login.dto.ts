// Login DTO - Request validation
// Following coding standards: Rule 13, Rule 18

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

