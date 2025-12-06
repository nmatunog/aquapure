// Prisma Service - Database connection
// Following coding standards: Rule 11, Rule 18, Rule 19, Rule 20

import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    })
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect()
      this.logger.log('✅ Database connected successfully')
      
      // Verify tables exist by running a simple query
      try {
        await this.$queryRaw`SELECT 1 FROM users LIMIT 1`
        this.logger.log('✅ Database tables verified')
      } catch (error) {
        this.logger.error('❌ Database tables do not exist!')
        this.logger.error('⚠️  Run migrations: npm run migrate:deploy')
        this.logger.error('⚠️  Or update Render Start Command to: npm run migrate:deploy && npm run start:prod')
        // Don't throw - let the app start so we can see the error in API calls
      }
    } catch (error) {
      this.logger.error('❌ Failed to connect to database:', error)
      throw error
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
    this.logger.log('Database disconnected')
  }
}
