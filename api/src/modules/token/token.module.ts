import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTokenRepository } from "./infrastructure/prisma-token.repository";
import { TokenService } from "./application/token.service";

@Module({
  providers: [
    TokenService,
    PrismaTokenRepository,
    PrismaService,
    { provide: 'TokenRepository', useClass: PrismaTokenRepository },
  ],
})
export class UserModule {}
