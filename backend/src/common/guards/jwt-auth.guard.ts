// JWT Authentication Guard
// Following coding standards: Rule 16, Rule 41

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  handleRequest<TUser = unknown>(err: Error | null, user: TUser): TUser {
    if (err || !user) {
      throw new UnauthorizedException('Invalid or missing authentication token')
    }
    return user
  }
}

