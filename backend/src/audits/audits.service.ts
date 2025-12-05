// Audits Service
// Following coding standards: Rule 11, Rule 12, Rule 18, Rule 19, Rule 20

import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAuditDto } from './dto/create-audit.dto'

@Injectable()
export class AuditsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createAuditDto: CreateAuditDto) {
    return this.prisma.audit.create({
      data: {
        userId,
        type: createAuditDto.type,
        data: createAuditDto.data,
        summary: createAuditDto.summary,
      },
    })
  }

  async findAll(userId: string) {
    return this.prisma.audit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
  }

  async findOne(id: string, userId: string) {
    const audit = await this.prisma.audit.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!audit) {
      throw new NotFoundException(`Audit with ID ${id} not found`)
    }

    return audit
  }
}
