// src/modules/auth/application/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/application/user.service';
import { User } from '../../user/domain/user.entity';
import { RoleService } from "../../role/application/role.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
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
    const role = await this.roleService.findById(user.role_id);
    console.log('234567 ', role)
    const plainUserObject = { ...user, role };
    console.log('2345678 ', plainUserObject)
    return {
      access_token: this.jwtService.sign(plainUserObject),
    };
  }
}
