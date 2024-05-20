// src/modules/auth/application/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/application/user.service';
import { User } from '../../user/domain/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, token: string): Promise<User | null> {
    const user = await this.userService.validateUser(email, token);
    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
