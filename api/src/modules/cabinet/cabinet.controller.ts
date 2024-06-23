import { Controller, Get, Post, Body, Param, Delete, Put, Request, UseGuards } from '@nestjs/common';
import { CabinetService } from './application/cabinet.service';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('cabinet')
@UseGuards(JwtAuthGuard)
export class CabinetController {
  constructor(private readonly cabinetService: CabinetService) {}

  @Post()
  create(@Request() req, @Body() body: { user_id: string, title: string, description: string }) {
    return this.cabinetService.create(parseInt(body.user_id), body.title, body.description);
  }

  @Get()
  findAll(@Request() req) {
    return this.cabinetService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.cabinetService.findOne(+id, req.user.id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() body: { title: string, description: string }) {
    return this.cabinetService.update(+id, req.user.id, body.title, body.description);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.cabinetService.remove(+id, req.user.id);
  }
}
