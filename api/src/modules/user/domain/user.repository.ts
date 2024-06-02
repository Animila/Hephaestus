import { User } from './user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
}