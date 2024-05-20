import { Injectable, Inject } from '@nestjs/common';
import { RoleRepository } from '../domain/role.repository';
import { Role } from '../domain/role.entity';

@Injectable()
export class RoleService {
  constructor(@Inject('RoleRepository') private readonly roleRepository: RoleRepository) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  findById(id: number): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }

  create(title: string): Promise<Role> {
    const role = new Role(null, title);
    return this.roleRepository.create(role);
  }

  update(id: number, title: string): Promise<Role> {
    const role = new Role(id, title);
    return this.roleRepository.update(id, role);
  }

  delete(id: number): Promise<void> {
    return this.roleRepository.delete(id);
  }
}
