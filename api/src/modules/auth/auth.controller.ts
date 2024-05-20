import { Controller, Post, UseGuards, Request, UsePipes, Body } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginValidationPipe } from 'src/common/pipes/login-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(LoginValidationPipe)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
