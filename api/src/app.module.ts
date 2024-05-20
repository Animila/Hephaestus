import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from "./modules/role/role.module";

@Module({
  imports: [AuthModule, UserModule, RoleModule],
})
export class AppModule {}
