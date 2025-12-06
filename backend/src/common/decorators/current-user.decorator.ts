// Current User Decorator
// Following coding standards: Rule 18, Rule 19

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface CurrentUserPayload {
  userId: string
  name: string
  team: string
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)

