import { Plan } from './plan.entity';

export interface PlanRepository {
  findById(id: number): Promise<Plan | null>;
  findByTitle(title: string): Promise<Plan | null>;
  findAll(): Promise<Plan[]>;
  save(plan: Plan): Promise<void>;
  update(plan: Plan): Promise<void>;
  delete(id: number): Promise<void>;
}
