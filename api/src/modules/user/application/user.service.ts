// src/modules/user/application/user.service.ts
import { Injectable, Inject, ConflictException, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { TokenService } from '../../token/application/token.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async register(firstName: string, lastName: string, phone: string, email: string, roleId: number): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }
    const user = new User(null, firstName, lastName, phone, email, false, roleId, new Date());
    const saved_user = await this.userRepository.save(user);
    if(!saved_user) {
      throw new InternalServerErrorException('Ошибка сохранения');
    }
    // Generate and send verification token
    await this.tokenService.sendToken(saved_user.id, 'verification');
  }

  async sendVerificationTokenByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    await this.tokenService.sendToken(user.id, 'verification');
    return user;
  }

  async validateUser(email: string, token: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await this.tokenService.validateToken(user.id, parseInt(token));
    if (!isValid) {
      throw new NotFoundException('Invalid or expired token');
    }

    return user;
  }
}
