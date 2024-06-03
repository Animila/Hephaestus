// src/modules/user/application/user.service.ts
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";
import { TokenService } from "../../token/application/token.service";
import { RoleService } from "../../role/application/role.service";

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly user_repository: UserRepository,
    private readonly token_service: TokenService,
    private readonly role_service: RoleService,
  ) {}

  async register(first_name: string, last_name: string, phone: string, email: string, role_id: number): Promise<void> {
    const existing_user = await this.user_repository.findByEmail(email);
    if (existing_user) {
      throw new ConflictException('Email is already in use');
    }

    const user = new User(null, first_name, last_name, phone, email, false, role_id ?? 2 , new Date());
    const saved_user = await this.user_repository.save(user);
    if(!saved_user) {
      throw new InternalServerErrorException('Ошибка сохранения');
    }
    // Generate and send verification token
    await this.token_service.sendToken(saved_user.id, 'verification');
  }

  async sendVerificationTokenByEmail(email: string): Promise<User | null> {
    const user = await this.user_repository.findByEmail(email);
    if (!user) {
      return null;
    }
    await this.token_service.sendToken(user.id, 'verification');
    return user;
  }

  async validateUser(email: string, token: string): Promise<User | null> {
    const user = await this.user_repository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await this.token_service.validateToken(user.id, parseInt(token));
    if (!isValid) {
      throw new NotFoundException('Invalid or expired token');
    }

    return user;
  }


  async findAll(): Promise<User[]> {
    const users = await this.user_repository.findAll();
    for (const user of users) {
      user['role'] = await this.role_service.findById(user.role_id);
    }
    return users;
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.user_repository.findById(id)
    user['role'] = await this.role_service.findById(user.role_id);
    return user;
  }

  async update(id: number, first_name: string, last_name: string, phone: string, email: string, activated: boolean, role_id: number, created_at: string): Promise<void> {
    const user = new User(id, first_name, last_name, phone, email, activated, role_id, new Date(created_at));
    await this.user_repository.update(user);
  }

  async remove(id: number): Promise<void> {
    await this.user_repository.delete(id);
  }
}
