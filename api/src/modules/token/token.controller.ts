// import { Controller, Post, Body } from '@nestjs/common';
// import { UserService } from './application/user.service';
//
// @Controller('token')
// export class UserController {
//   constructor(private readonly userService: UserService) {}
//
//   @Post('register')
//   async register(@Body() body: { firstName: string, lastName: string, phone: string, email: string, password: string, roleId: number }) {
//     return this.userService.register(body.firstName, body.lastName, body.phone, body.email, body.password, body.roleId);
//   }
// }
