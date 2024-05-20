import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlanRepository } from '../domain/plan.repository';
import { Plan } from '../domain/plan.entity';

@Injectable()
export class PrismaPlanRepository implements PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Plan | null> {
    const plan = await this.prisma.plans.findUnique({ where: { id } });
    if (!plan) return null;
    return new Plan(plan.id, plan.title, plan.scopes, plan.price);
  }

  async findByTitle(title: string): Promise<Plan | null> {
    const plan = await this.prisma.plans.findUnique({ where: { title } });
    if (!plan) return null;
    return new Plan(plan.id, plan.title, plan.scopes, plan.price);
  }

  async findAll(): Promise<Plan[]> {
    const plans = await this.prisma.plans.findMany();
    return plans.map(plan => new Plan(plan.id, plan.title, plan.scopes, plan.price));
  }

  async save(plan: Plan): Promise<void> {
    const existingPlan = await this.prisma.plans.findUnique({ where: { title: plan.title } });
    if (existingPlan) {
      throw new ConflictException('Plan title already exists');
    }
    await this.prisma.plans.create({
      data: {
        title: plan.title,
        scopes: plan.scopes,
        price: plan.price,
      },
    });
  }

  async update(plan: Plan): Promise<void> {
    const existingPlan = await this.prisma.plans.findUnique({ where: { title: plan.title } });
    if (existingPlan && existingPlan.id !== plan.id) {
      throw new ConflictException('Plan title already exists');
    }
    await this.prisma.plans.update({
      where: { id: plan.id },
      data: {
        title: plan.title,
        scopes: plan.scopes,
        price: plan.price,
      },
    });
  }

  async delete(id: number): Promise<void> {
    const plan = await this.findById(id);
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    await this.prisma.plans.delete({ where: { id } });
  }
}
