import { Controller, Post, Body, UseGuards, Request, Get, UsePipes } from '@nestjs/common';
import { UserService } from './application/user.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateValidationPipe } from 'src/common/pipes/create-validation.pipe';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(CreateValidationPipe)
  async register(@Body() body: { firstName: string, lastName: string, phone: string, email: string, roleId: number }) {
    return this.userService.register(body.firstName, body.lastName, body.phone, body.email, body.roleId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
