import { Role } from './role.entity';

export interface RoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role | null>;
  create(role: Role): Promise<Role>;
  update(id: number, role: Role): Promise<Role>;
  delete(id: number): Promise<void>;
}
