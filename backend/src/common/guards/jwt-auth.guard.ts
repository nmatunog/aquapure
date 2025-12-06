// JWT Auth Guard
// Following coding standards: Rule 16, Rule 18, Rule 19

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest<TUser = unknown>(
    err: Error | null,
    user: TUser,
    info: Error | string
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing token')
    }
    return user
  }
}

