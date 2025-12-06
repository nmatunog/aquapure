// Audits Service - Audit CRUD operations
// Following coding standards: Rule 11, Rule 12, Rule 17, Rule 18, Rule 19, Rule 20

import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAuditDto } from '../common/dto/create-audit.dto'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Prisma } from '../../generated/prisma'

export interface AuditResponse {
  id: string
  type: string
  data: Record<string, unknown>
  summary: string
  createdAt: Date
}

@Injectable()
export class AuditsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createAuditDto: CreateAuditDto): Promise<AuditResponse> {
    const audit = await this.prisma.audit.create({
      data: {
        userId,
        type: createAuditDto.type,
        data: createAuditDto.data as Prisma.InputJsonValue,
        summary: createAuditDto.summary,
      },
    })

    return {
      id: audit.id,
      type: audit.type,
      data: audit.data as Record<string, unknown>,
      summary: audit.summary,
      createdAt: audit.createdAt,
    }
  }

  async findAll(userId: string): Promise<AuditResponse[]> {
    const audits = await this.prisma.audit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    return audits.map((audit) => ({
      id: audit.id,
      type: audit.type,
      data: audit.data as Record<string, unknown>,
      summary: audit.summary,
      createdAt: audit.createdAt,
    }))
  }

  async findOne(id: string, userId: string): Promise<AuditResponse> {
    const audit = await this.prisma.audit.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!audit) {
      throw new NotFoundException(`Audit with ID ${id} not found`)
    }

    return {
      id: audit.id,
      type: audit.type,
      data: audit.data as Record<string, unknown>,
      summary: audit.summary,
      createdAt: audit.createdAt,
    }
  }
}
