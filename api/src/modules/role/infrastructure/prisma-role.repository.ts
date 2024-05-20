import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleRepository } from '../domain/role.repository';
import { Role } from '../domain/role.entity';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Role[]> {
    const roles = await this.prisma.roles.findMany();
    return roles.map(role => new Role(role.id, role.title));
  }

  async findById(id: number): Promise<Role | null> {
    const role = await this.prisma.roles.findUnique({ where: { id } });
    if (!role) return null;
    return new Role(role.id, role.title);
  }

  async create(role: Role): Promise<Role> {
    const newRole = await this.prisma.roles.create({
      data: {
        title: role.title,
      },
    });
    return new Role(newRole.id, newRole.title);
  }

  async update(id: number, role: Role): Promise<Role> {
    const updatedRole = await this.prisma.roles.update({
      where: { id },
      data: {
        title: role.title,
      },
    });
    return new Role(updatedRole.id, updatedRole.title);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.roles.delete({ where: { id } });
  }
}
