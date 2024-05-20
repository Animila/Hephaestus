import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../domain/token.repository';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async sendToken(userId: number, type: string): Promise<void> {
    const token = await this.tokenRepository.generateToken(userId, type);
    // Здесь необходимо отправить код на email пользователя. Используйте ваш почтовый сервис.
    console.log(`Отправить код ${token.numberCode} пользователю с ID ${userId}`);
  }

  async validateToken(userId: number, code: number): Promise<boolean> {
    return this.tokenRepository.validateToken(userId, code);
  }
}
