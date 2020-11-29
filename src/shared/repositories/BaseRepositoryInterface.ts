import { DeepPartial } from 'typeorm';

interface BaseRepositoryInterface<T> {
  create(secret: DeepPartial<T>): T;
  save(secret: T): Promise<T>;
  index(): Promise<T[]>;
  findById(id: string | number): Promise<T | undefined>;
  findByIds(id: string[] | number[]): Promise<T[]>;
}

export default BaseRepositoryInterface;
