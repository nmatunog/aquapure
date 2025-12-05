// Main Application Module
// Following coding standards: Rule 11, Rule 12

import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { AuditsModule } from './audits/audits.module'
import { MetricsModule } from './metrics/metrics.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Module({
  imports: [PrismaModule, AuthModule, AuditsModule, MetricsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
