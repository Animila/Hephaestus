import { Injectable, Inject } from '@nestjs/common';
import { TokenRepository } from '../domain/token.repository';
import { UserRepository } from '../../user/domain/user.repository';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TokenRepository') private readonly tokenRepository: TokenRepository,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async sendToken(userId: number, type: string): Promise<void> {
    const token = await this.tokenRepository.generateToken(userId, type);
    // Отправка кода по email пользователя
    const user = await this.userRepository.findById(userId); // Получаем пользователя по ID
    if (!user) {
      throw new Error('User not found');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email, // Используем email пользователя
      subject: 'Your Verification Code',
      text: `Your verification code is: ${token.token}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Отправить код ${token.token} пользователю с ID ${userId}`);
  }

  async validateToken(userId: number, code: number): Promise<boolean> {
    return this.tokenRepository.validateToken(userId, code);
  }
}
