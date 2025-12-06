// Audits Controller - Audit endpoints
// Following coding standards: Rule 5, Rule 12, Rule 17, Rule 19

import { Controller, Get, Post, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { AuditsService } from './audits.service'
import { CreateAuditDto } from '../common/dto/create-audit.dto'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import type { CurrentUserPayload } from '../common/decorators/current-user.decorator'

@Controller('api/audits')
@UseGuards(JwtAuthGuard)
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: CurrentUserPayload,
    @Body() createAuditDto: CreateAuditDto
  ): Promise<{ data: unknown; success: boolean; message?: string }> {
    const audit = await this.auditsService.create(user.userId, createAuditDto)
    return {
      data: audit,
      success: true,
      message: 'Audit saved successfully',
    }
  }

  @Get()
  async findAll(@CurrentUser() user: CurrentUserPayload): Promise<{ data: unknown[]; success: boolean }> {
    const audits = await this.auditsService.findAll(user.userId)
    return {
      data: audits,
      success: true,
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload
  ): Promise<{ data: unknown; success: boolean }> {
    const audit = await this.auditsService.findOne(id, user.userId)
    return {
      data: audit,
      success: true,
    }
  }
}
