import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaUserRepository,
    PrismaService,
    { provide: 'UserRepository', useClass: PrismaUserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
