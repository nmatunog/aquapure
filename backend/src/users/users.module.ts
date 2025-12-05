// Users Module - User management (currently handled by Auth module)
// Following coding standards: Rule 11

import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
