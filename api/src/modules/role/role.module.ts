import { Module } from '@nestjs/common';
import { RoleService } from './application/role.service';
import { PrismaRoleRepository } from './infrastructure/prisma-role.repository';
import { RoleController } from './role.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    PrismaRoleRepository,
    PrismaService,
    { provide: 'RoleRepository', useClass: PrismaRoleRepository },
  ],
  exports: [RoleService],
})
export class RoleModule {}
