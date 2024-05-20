import { Injectable, Inject } from '@nestjs/common';
import { PlanRepository } from '../domain/plan.repository';
import { Plan } from '../domain/plan.entity';

@Injectable()
export class PlanService {
  constructor(@Inject('PlanRepository') private readonly planRepository: PlanRepository) {}

  async create(title: string, scopes: any, price: number): Promise<void> {
    const plan = new Plan(null, title, scopes, price);
    await this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.findAll();
  }

  async findOne(id: number): Promise<Plan | null> {
    return this.planRepository.findById(id);
  }

  async update(id: number, title: string, scopes: any, price: number): Promise<void> {
    const plan = new Plan(id, title, scopes, price);
    await this.planRepository.update(plan);
  }

  async remove(id: number): Promise<void> {
    await this.planRepository.delete(id);
  }
}
