import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async register(firstName: string, lastName: string, phone: string, email: string, password: string, roleId: number): Promise<void> {
    const existing_user = await this.userRepository.findByEmail(email);
    if(existing_user) {
      throw new ConflictException('Почта уже используется');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(null, firstName, lastName, phone, email, hashedPassword, false, roleId, new Date());
    await this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
