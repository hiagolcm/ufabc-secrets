import { DeepPartial, EntityTarget, getRepository, Repository } from 'typeorm';
import BaseRepositoryInterface from '../../../repositories/BaseRepositoryInterface';

class BaseRepositoryTypeORM<T> implements BaseRepositoryInterface<T> {
  public ormRepository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.ormRepository = getRepository<T>(entity);
  }

  public create(partialItem: Partial<T>) {
    return this.ormRepository.create(partialItem as DeepPartial<T>);
  }

  public save(item: T) {
    return this.ormRepository.save(item);
  }

  public index() {
    return this.ormRepository.find();
  }
}

export default BaseRepositoryTypeORM;
