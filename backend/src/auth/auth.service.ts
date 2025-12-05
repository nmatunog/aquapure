// Authentication Service
// Following coding standards: Rule 11, Rule 12, Rule 13, Rule 18, Rule 19

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import { AuthResponseDto } from './dto/auth-response.dto'
import { JwtPayload } from './strategies/jwt.strategy'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Find or create user
    let user = await this.prisma.user.findFirst({
      where: {
        name: loginDto.name,
        team: loginDto.team,
      },
    })

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name: loginDto.name,
          team: loginDto.team,
        },
      })
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email || undefined,
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

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        team: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }

  async updateProfile(userId: string, name: string, team: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name,
        team,
      },
      select: {
        id: true,
        name: true,
        team: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }
}
