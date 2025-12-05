// Users Controller - User management endpoints
// Following coding standards: Rule 5, Rule 17

import { Controller } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // User endpoints are primarily in AuthController
  // This controller can be extended for additional user management features
}
