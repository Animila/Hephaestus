import { Cabinet } from './cabinet.entity';

export interface CabinetRepository {
  findById(id: number): Promise<Cabinet | null>;
  findByTitle(title: string): Promise<Cabinet | null>;
  findAllByUser(userId: number): Promise<Cabinet[]>;
  save(cabinet: Cabinet): Promise<void>;
  update(cabinet: Cabinet): Promise<void>;
  delete(id: number): Promise<void>;
}
