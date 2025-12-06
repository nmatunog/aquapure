// Auth Service - JWT authentication and user management
// Following coding standards: Rule 11, Rule 12, Rule 17, Rule 18, Rule 19, Rule 20

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from '../common/dto/login.dto'
import * as bcrypt from 'bcryptjs'

export interface JwtPayload {
  userId: string
  name: string
  team: string
}

export interface LoginResponse {
  user: {
    id: string
    name: string
    team: string
  }
  token: string
  refreshToken?: string
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    let user
    try {
      // Find or create user
      user = await this.prisma.user.findFirst({
        where: {
          name: loginDto.name,
          team: loginDto.team,
        },
      })

      if (!user) {
        // Create new user if doesn't exist
        user = await this.prisma.user.create({
          data: {
            name: loginDto.name,
            team: loginDto.team,
          },
        })
      }
    } catch (error) {
      // Provide helpful error message if tables don't exist
      if (error instanceof Error && error.message.includes('does not exist')) {
        throw new Error(
          'Database tables not found. Please run migrations: npm run migrate:deploy'
        )
      }
      throw error
    }

    // Generate JWT token
    const payload: JwtPayload = {
      userId: user.id,
      name: user.name,
      team: user.team,
    }

    const token = this.jwtService.sign(payload)

    return {
      user: {
        id: user.id,
        name: user.name,
        team: user.team,
      },
      token,
    }
  }

  async validateUser(userId: string): Promise<JwtPayload | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return null
    }

    return {
      userId: user.id,
      name: user.name,
      team: user.team,
    }
  }

  async getProfile(userId: string): Promise<{ id: string; name: string; team: string; createdAt: Date; updatedAt: Date }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        team: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }

  async updateProfile(userId: string, profileData: LoginDto): Promise<{ id: string; name: string; team: string; createdAt: Date; updatedAt: Date }> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: profileData.name,
        team: profileData.team,
      },
      select: {
        id: true,
        name: true,
        team: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return user
  }
}
