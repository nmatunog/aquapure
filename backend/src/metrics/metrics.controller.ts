// Metrics Controller - Metrics endpoints
// Following coding standards: Rule 5, Rule 12, Rule 17, Rule 19

import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common'
import { MetricsService } from './metrics.service'
import { UpdateMetricDto } from '../common/dto/update-metric.dto'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import type { CurrentUserPayload } from '../common/decorators/current-user.decorator'

@Controller('api/metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('weekly')
  async getMetrics(@CurrentUser() user: CurrentUserPayload): Promise<{ data: unknown; success: boolean }> {
    const metrics = await this.metricsService.getMetrics(user.userId)
    return {
      data: metrics,
      success: true,
    }
  }

  @Put('weekly')
  async updateMetric(
    @CurrentUser() user: CurrentUserPayload,
    @Body() updateMetricDto: UpdateMetricDto
  ): Promise<{ data: unknown; success: boolean; message?: string }> {
    const metrics = await this.metricsService.updateMetric(user.userId, updateMetricDto)
    return {
      data: metrics,
      success: true,
      message: 'Metric updated successfully',
    }
  }
}
