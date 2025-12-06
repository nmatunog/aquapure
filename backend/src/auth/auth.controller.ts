// Auth Controller - Authentication endpoints
// Following coding standards: Rule 5, Rule 12, Rule 17, Rule 19

import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService, LoginResponse } from './auth.service'
import { LoginDto } from '../common/dto/login.dto'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import type { CurrentUserPayload } from '../common/decorators/current-user.decorator'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{ data: LoginResponse; success: boolean; message?: string }> {
    const result = await this.authService.login(loginDto)
    return {
      data: result,
      success: true,
      message: 'Login successful',
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: CurrentUserPayload): Promise<{ data: unknown; success: boolean; message?: string }> {
    const profile = await this.authService.getProfile(user.userId)
    return {
      data: profile,
      success: true,
    }
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: CurrentUserPayload,
    @Body() profileDto: LoginDto
  ): Promise<{ data: unknown; success: boolean; message?: string }> {
    const profile = await this.authService.updateProfile(user.userId, profileDto)
    return {
      data: profile,
      success: true,
      message: 'Profile updated successfully',
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(): Promise<{ success: boolean; message: string }> {
    // In a stateless JWT system, logout is handled client-side by removing the token
    // If you need server-side token blacklisting, implement it here
    return {
      success: true,
      message: 'Logout successful',
    }
  }
}
