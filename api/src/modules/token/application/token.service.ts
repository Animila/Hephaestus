import { Injectable, Inject, Logger } from '@nestjs/common';
import { TokenRepository } from '../domain/token.repository';
import { UserRepository } from '../../user/domain/user.repository';
import { ProducerService } from "../../../common/rabbitmq/producer.service";

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    @Inject('TokenRepository') private readonly tokenRepository: TokenRepository,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly producerService: ProducerService,
  ) {}

  async sendToken(userId: number, type: string): Promise<void> {
    const token = await this.tokenRepository.generateToken(userId, type);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    this.logger.log(`Sending token ${token.token} to user ${user.email}`);

    await this.producerService.addToEmailQueue({ email: user.email, token: token.token, userId: user.id });
    this.logger.log(`Sent token ${token.token} to user ${user.email}`);
  }

  async validateToken(userId: number, code: number): Promise<boolean> {
    return this.tokenRepository.validateToken(userId, code);
  }
}
