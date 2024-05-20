import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CabinetService } from './application/cabinet.service';
import { CabinetController } from './cabinet.controller';
import { PrismaCabinetRepository } from './infrastructure/prisma-cabinet.repository';

@Module({
  controllers: [CabinetController],
  providers: [
    PrismaService,
    CabinetService,
    { provide: 'CabinetRepository', useClass: PrismaCabinetRepository },
  ],
})
export class CabinetModule {}
