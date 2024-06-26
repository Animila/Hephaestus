import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { PrismaTokenRepository } from '../token/infrastructure/prisma-token.repository';
import { TokenService } from '../token/application/token.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RabbitModule } from '../../common/rabbitmq/rabbit.module';
import { RoleModule } from "../role/role.module";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaUserRepository,
    PrismaTokenRepository,
    TokenService,
    PrismaService,
    { provide: 'UserRepository', useClass: PrismaUserRepository },
    { provide: 'TokenRepository', useClass: PrismaTokenRepository },
  ],
  imports: [RabbitModule, RoleModule], // Добавьте RabbitModule в imports
  exports: [UserService],
})
export class UserModule {}