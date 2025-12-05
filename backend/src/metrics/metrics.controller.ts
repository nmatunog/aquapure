// Metrics Controller
// Following coding standards: Rule 17, Rule 19

import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common'
import { MetricsService } from './metrics.service'
import { UpdateMetricDto } from './dto/update-metric.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { ApiResponseDto } from '../common/dto/api-response.dto'

interface User {
  id: string
}

@Controller('metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('weekly')
  async getWeekly(@CurrentUser() user: User): Promise<ApiResponseDto<unknown>> {
    const metrics = await this.metricsService.getWeeklyMetrics(user.id)
    return new ApiResponseDto(metrics)
  }

  @Put('weekly')
  async updateMetric(
    @CurrentUser() user: User,
    @Body() updateMetricDto: UpdateMetricDto,
  ): Promise<ApiResponseDto<unknown>> {
    const metrics = await this.metricsService.updateMetric(user.id, updateMetricDto)
    return new ApiResponseDto(metrics, 'Metric updated successfully')
  }
}
