import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/application/user.service';
import { User } from '../../user/domain/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.roleId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
