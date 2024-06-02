import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.first_name, user.last_name, user.phone, user.email, user.activated, user.role_id, user.created_at);
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) return null;
    return new User(user.id, user.first_name, user.last_name, user.phone, user.email, user.activated, user.role_id, user.created_at);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany();
    return users.map(user => new User(user.id, user.first_name, user.last_name, user.phone, user.email, user.activated, user.role_id, user.created_at))
  }

  async update(user: User): Promise<void> {
    const existingPlan = await this.prisma.users.findUnique({ where: { email: user.email } });
    if (existingPlan && existingPlan.id !== user.id) {
      throw new ConflictException('Почта уже существует');
    }
    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        activated: user.activated,
        role_id: user.role_id,
        created_at: user.created_at
      },
    });
  }
  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    await this.prisma.users.delete({ where: { id } });
  }

  async save(user: User): Promise<User | null> {
    const result = await this.prisma.users.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        activated: user.activated,
        role_id: user.role_id,
        created_at: new Date(Date.now())
      },
    });
    if(!result) return null
    return result
  }
}
