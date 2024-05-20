import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenRepository } from '../domain/token.repository';
import { Token } from '../domain/token.entity';

@Injectable()
export class PrismaTokenRepository implements TokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async generateToken(userId: number, type: string): Promise<Token> {
    const numberCode = Math.floor(100000 + Math.random() * 900000); // Генерация шестизначного кода
    const token = await this.prisma.tokens.create({
      data: {
        user_id: userId,
        token: '',
        type: type,
        number_code: numberCode,
      },
    });
    return new Token(token.id, token.user_id, token.token, token.type, token.number_code, token.is_valid, token.created_at, token.used_at);
  }

  async validateToken(userId: number, code: number): Promise<boolean> {
    const token = await this.prisma.tokens.findFirst({
      where: {
        user_id: userId,
        number_code: code,
        is_valid: true,
      },
    });

    if (!token) {
      return false;
    }

    await this.prisma.tokens.update({
      where: { id: token.id },
      data: { is_valid: false, used_at: new Date() },
    });

    return true;
  }
}
