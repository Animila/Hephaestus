// src/modules/auth/auth.controller.ts
import { Controller, Post, UsePipes, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { UserService } from '../user/application/user.service';
import { LoginValidationPipe } from 'src/common/pipes/login-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UsePipes(LoginValidationPipe)
  async login(@Body() body: { email: string }) {
    const user = await this.userService.sendVerificationTokenByEmail(body.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Verification code sent to email' };
  }

  @Post('verify')
  @UsePipes(LoginValidationPipe)
  async verify(@Body() body: { email: string, token: string }) {
    const user = await this.authService.validateUser(body.email, body.token);
    return this.authService.login(user);
  }
}
