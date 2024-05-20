import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.first_name, user.last_name, user.phone, user.email, user.password, user.activated, user.role_id, user.created_at);
  }

  async save(user: User): Promise<void> {
    await this.prisma.users.create({
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        phone: user.phone,
        email: user.email,
        password: user.password,
        activated: user.activated,
        role_id: user.roleId,
      },
    });
  }
}
