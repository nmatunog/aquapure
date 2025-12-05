// Audits Controller
// Following coding standards: Rule 17, Rule 19

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { AuditsService } from './audits.service'
import { CreateAuditDto } from './dto/create-audit.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { ApiResponseDto } from '../common/dto/api-response.dto'

interface User {
  id: string
}

@Controller('audits')
@UseGuards(JwtAuthGuard)
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createAuditDto: CreateAuditDto,
  ): Promise<ApiResponseDto<unknown>> {
    const audit = await this.auditsService.create(user.id, createAuditDto)
    return new ApiResponseDto(audit, 'Audit saved successfully')
  }

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ApiResponseDto<unknown[]>> {
    const audits = await this.auditsService.findAll(user.id)
    return new ApiResponseDto(audits)
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<ApiResponseDto<unknown>> {
    const audit = await this.auditsService.findOne(id, user.id)
    return new ApiResponseDto(audit)
  }
}
