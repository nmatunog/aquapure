// App Module - Root module
// Following coding standards: Rule 11

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AuditsModule } from './audits/audits.module'
import { MetricsModule } from './metrics/metrics.module'

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, AuditsModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
