import { User } from './user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>; // Новый метод для поиска пользователя по ID
  save(user: User): Promise<User | null>;
}