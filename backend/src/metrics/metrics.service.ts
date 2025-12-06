// Metrics Service - Weekly metrics management
// Following coding standards: Rule 11, Rule 12, Rule 17, Rule 18, Rule 19, Rule 20

import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateMetricDto } from '../common/dto/update-metric.dto'

export interface WeeklyMetricsResponse {
  dealerAudits: number
  hoaSurveys: number
  industrialMeetings: number
  dealerConversions: number
  newRefillStations: number
  bulkContracts: number
}

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async getMetrics(userId: string): Promise<WeeklyMetricsResponse> {
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

    return {
      dealerAudits: metrics.dealerAudits,
      hoaSurveys: metrics.hoaSurveys,
      industrialMeetings: metrics.industrialMeetings,
      dealerConversions: metrics.dealerConversions,
      newRefillStations: metrics.newRefillStations,
      bulkContracts: metrics.bulkContracts,
    }
  }

  async updateMetric(userId: string, updateMetricDto: UpdateMetricDto): Promise<WeeklyMetricsResponse> {
    // Ensure metrics exist
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
    const updateData: Record<string, number> = {
      [updateMetricDto.metricKey]: updateMetricDto.value,
    }

    const updated = await this.prisma.weeklyMetrics.update({
      where: { userId },
      data: updateData,
    })

    return {
      dealerAudits: updated.dealerAudits,
      hoaSurveys: updated.hoaSurveys,
      industrialMeetings: updated.industrialMeetings,
      dealerConversions: updated.dealerConversions,
      newRefillStations: updated.newRefillStations,
      bulkContracts: updated.bulkContracts,
    }
  }
}
