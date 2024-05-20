import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PlanService } from './application/plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() body: { title: string, scopes: any, price: number }) {
    return this.planService.create(body.title, body.scopes, body.price);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { title: string, scopes: any, price: number }) {
    return this.planService.update(+id, body.title, body.scopes, body.price);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(+id);
  }
}
