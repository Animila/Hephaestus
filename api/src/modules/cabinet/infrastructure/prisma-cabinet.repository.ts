import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CabinetRepository } from '../domain/cabinet.repository';
import { Cabinet } from '../domain/cabinet.entity';

@Injectable()
export class PrismaCabinetRepository implements CabinetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Cabinet | null> {
    const cabinet = await this.prisma.cabinets.findUnique({ where: { id } });
    if (!cabinet) return null;
    return new Cabinet(cabinet.id, cabinet.user_id, cabinet.title,cabinet.description, cabinet.created_at);
  }

  async findByTitle(title: string): Promise<Cabinet | null> {
    const cabinet = await this.prisma.cabinets.findUnique({ where: { title } });
    if (!cabinet) return null;
    return new Cabinet(cabinet.id, cabinet.user_id, cabinet.title,cabinet.description, cabinet.created_at);
  }

  async findAllByUser(userId: number): Promise<Cabinet[]> {
    const cabinets = await this.prisma.cabinets.findMany({ where: { user_id: userId }, orderBy: [
        { id: 'asc'}
      ]});
    return cabinets.map(cabinet => new Cabinet(cabinet.id, cabinet.user_id, cabinet.title,cabinet.description, cabinet.created_at));
  }

  async save(cabinet: Cabinet): Promise<void> {
    console.log('1234567 ', cabinet)
    const existingCabinet = await this.prisma.cabinets.findUnique({ where: { title: cabinet.title } });
    if (existingCabinet) {
      throw new ConflictException('Cabinet title already exists');
    }
    console.log('876543 ', cabinet)
    await this.prisma.cabinets.create({
      data: {
        user_id: cabinet.userId,
        title: cabinet.title,
        description: cabinet.description,
        created_at: cabinet.createdAt,
      },
    });
  }

  async update(cabinet: Cabinet): Promise<void> {
    const existingCabinet = await this.prisma.cabinets.findUnique({ where: { title: cabinet.title } });
    if (existingCabinet && existingCabinet.id !== cabinet.id) {
      throw new ConflictException('Cabinet title already exists');
    }
    await this.prisma.cabinets.update({
      where: { id: cabinet.id },
      data: {
        title: cabinet.title,
        description: cabinet.description,
      },
    });
  }

  async delete(id: number): Promise<void> {
    const cabinet = await this.findById(id);
    if (!cabinet) {
      throw new NotFoundException('Cabinet not found');
    }
    await this.prisma.cabinets.delete({ where: { id } });
  }
}
