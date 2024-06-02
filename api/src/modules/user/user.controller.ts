import { Controller, Post, Body, UseGuards, Request, Get, UsePipes, Param, Put, Delete } from "@nestjs/common";
import { UserService } from './application/user.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateValidationPipe } from 'src/common/pipes/create-validation.pipe';


@Controller('user')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @Post('register')
  @UsePipes(CreateValidationPipe)
  async register(@Body() body: { first_name: string, last_name: string, phone: string, email: string, role_id: number }) {
    return this.user_service.register(body.first_name, body.last_name, body.phone, body.email, body.role_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @Get()
  findAll() {
    return this.user_service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.user_service.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: { first_name: string, last_name: string, phone: string, email: string, activated: boolean, role_id: number, created_at: string }) {
    return this.user_service.update(+id, body.first_name, body.last_name, body.phone, body.email, body.activated, body.role_id, body.created_at);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.user_service.remove(+id);
  }
}
