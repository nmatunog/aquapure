// Users Service - User management operations
// Following coding standards: Rule 11, Rule 17, Rule 18, Rule 19, Rule 20

import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // User operations are primarily handled by AuthService
  // This service can be extended for additional user management features
}
