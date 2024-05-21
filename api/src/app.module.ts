import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PrismaService } from './prisma/prisma.service';
import { PlanModule } from './modules/plan/plan.module';
import { CabinetModule } from './modules/cabinet/cabinet.module';
// import { MailProcessorModule } from './modules/mail-processor/mail-processor.module';
import { RabbitModule } from './common/rabbitmq/rabbit.module'; // Убедитесь, что RabbitModule импортирован

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    CabinetModule,
    PlanModule,
    // MailProcessorModule,
    RabbitModule, // Импортируйте RabbitModule
  ],
  providers: [PrismaService],
})
export class AppModule {}

