// Authentication Controller
// Following coding standards: Rule 17, Rule 19

import { Controller, Post, Get, Body, UseGuards, Put } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Public } from '../common/decorators/public.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { ApiResponseDto } from '../common/dto/api-response.dto'

interface User {
  id: string
  name: string
  team: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponseDto<unknown>> {
    const result = await this.authService.login(loginDto)
    return new ApiResponseDto(result, 'Login successful')
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User): Promise<ApiResponseDto<unknown>> {
    const profile = await this.authService.getProfile(user.id)
    return new ApiResponseDto(profile)
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @CurrentUser() user: User,
    @Body() updateDto: LoginDto,
  ): Promise<ApiResponseDto<unknown>> {
    const profile = await this.authService.updateProfile(
      user.id,
      updateDto.name,
      updateDto.team,
    )
    return new ApiResponseDto(profile, 'Profile updated successfully')
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(): Promise<ApiResponseDto<{ message: string }>> {
    // In a real implementation, you might invalidate the token
    // For now, we'll just return success
    return new ApiResponseDto({ message: 'Logged out successfully' })
  }
}
