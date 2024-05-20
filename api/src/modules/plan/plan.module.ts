import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlanService } from './application/plan.service';
import { PlanController } from './plan.controller';
import { PrismaPlanRepository } from './infrastructure/prisma-plan.repository';

@Module({
  controllers: [PlanController],
  providers: [
    PrismaService,
    PlanService,
    { provide: 'PlanRepository', useClass: PrismaPlanRepository },
  ],
})
export class PlanModule {}
