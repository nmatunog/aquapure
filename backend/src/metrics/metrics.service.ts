// Metrics Service
// Following coding standards: Rule 11, Rule 12, Rule 18, Rule 19, Rule 20

import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateMetricDto } from './dto/update-metric.dto'

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async getWeeklyMetrics(userId: string) {
    let metrics = await this.prisma.weeklyMetrics.findUnique({
      where: { userId },
    })

    if (!metrics) {
      // Create default metrics if they don't exist
      metrics = await this.prisma.weeklyMetrics.create({
        data: {
          userId,
          dealerAudits: 0,
          hoaSurveys: 0,
          industrialMeetings: 0,
          dealerConversions: 0,
          newRefillStations: 0,
          bulkContracts: 0,
        },
      })
    }

    return metrics
  }

  async updateMetric(userId: string, updateMetricDto: UpdateMetricDto) {
    // Get or create metrics
    let metrics = await this.prisma.weeklyMetrics.findUnique({
      where: { userId },
    })

    if (!metrics) {
      metrics = await this.prisma.weeklyMetrics.create({
        data: {
          userId,
          dealerAudits: 0,
          hoaSurveys: 0,
          industrialMeetings: 0,
          dealerConversions: 0,
          newRefillStations: 0,
          bulkContracts: 0,
        },
      })
    }

    // Update the specific metric
    return this.prisma.weeklyMetrics.update({
      where: { userId },
      data: {
        [updateMetricDto.metricKey]: updateMetricDto.value,
      },
    })
  }
}
