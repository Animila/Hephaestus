import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { CabinetRepository } from '../domain/cabinet.repository';
import { Cabinet } from '../domain/cabinet.entity';

@Injectable()
export class CabinetService {
  constructor(@Inject('CabinetRepository') private readonly cabinetRepository: CabinetRepository) {}

  async create(userId: number, title: string): Promise<void> {
    const cabinet = new Cabinet(null, userId, title, new Date());
    await this.cabinetRepository.save(cabinet);
  }

  async findAll(userId: number): Promise<Cabinet[]> {
    return this.cabinetRepository.findAllByUser(userId);
  }

  async findOne(id: number, userId: number): Promise<Cabinet | null> {
    const cabinet = await this.cabinetRepository.findById(id);
    if (cabinet && cabinet.userId !== userId) {
      throw new NotFoundException('Cabinet not found');
    }
    return cabinet;
  }

  async update(id: number, userId: number, title: string): Promise<void> {
    const cabinet = new Cabinet(id, userId, title, new Date());
    await this.cabinetRepository.update(cabinet);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.cabinetRepository.delete(id);
  }
}
