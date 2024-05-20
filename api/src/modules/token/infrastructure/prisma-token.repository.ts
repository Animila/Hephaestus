import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenRepository } from '../domain/token.repository';
import { Token } from '../domain/token.entity';

@Injectable()
export class PrismaTokenRepository implements TokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(token: Token): Promise<void> {
    await this.prisma.tokens.create({
      data: {
        user_id: token.userId,
        token: token.token,
        type: token.type,
        is_valid: token.isValid,
        created_at: token.createdAt,
        expires_at: token.expiresAt,
      },
    });
  }

  async findValidToken(userId: number, token: string): Promise<Token | null> {
    const tokenRecord = await this.prisma.tokens.findFirst({
      where: {
        user_id: userId,
        token,
        is_valid: true,
        expires_at: {
          gt: new Date(),
        },
      },
    });

    if (!tokenRecord) return null;

    return new Token(
      tokenRecord.id,
      tokenRecord.user_id,
      tokenRecord.token,
      tokenRecord.type,
      tokenRecord.is_valid,
      tokenRecord.created_at,
      tokenRecord.expires_at,
    );
  }

  async findTokenByUserAndCode(userId: number, token: string): Promise<boolean> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    if (!token) {
      throw new Error('Token is required');
    }

    const tokenRecord = await this.prisma.tokens.findFirst({
      where: {
        user_id: userId,
        token,
      },
    });

    return !!tokenRecord;
  }

  async invalidateToken(id: number): Promise<void> {
    await this.prisma.tokens.update({
      where: { id },
      data: { is_valid: false },
    });
  }

  async generateToken(userId: number, type: string): Promise<Token> {
    let token: string;
    let tokenExists: boolean;

    do {
      token = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit token
      tokenExists = await this.findTokenByUserAndCode(userId, token);
    } while (tokenExists);

    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours

    const tokenEntity = new Token(null, userId, token, type, true, new Date(), expiresAt);
    await this.save(tokenEntity);
    return tokenEntity;
  }

  async validateToken(userId: number, code: number): Promise<boolean> {
    const token = await this.prisma.tokens.findFirst({
      where: {
        user_id: userId,
        token: code.toString(),
        is_valid: true,
        expires_at: {
          gt: new Date(),
        },
      },
    });

    if (!token) {
      return false;
    }

    await this.invalidateToken(token.id);
    return true;
  }
}