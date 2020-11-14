import BaseRepositoryInterface from '../../../../shared/repositories/BaseRepositoryInterface';

class BaseRepositoryFake<T> implements BaseRepositoryInterface<T> {
  public items: T[] = [];

  create(partialItem: Partial<T>): T {
    return partialItem as T;
  }

  save(item: T): Promise<T> {
    return new Promise((resolve) => {
      this.items.push(item);
      resolve(item);
    });
  }

  index(): Promise<T[]> {
    return new Promise((resolve) => {
      resolve(this.items);
    });
  }
}

export default BaseRepositoryFake;
