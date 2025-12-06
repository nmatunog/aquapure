// JWT Strategy - Passport JWT authentication
// Following coding standards: Rule 16, Rule 18, Rule 19

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService, JwtPayload } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    })
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.authService.validateUser(payload.userId)
    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }
    return user
  }
}

