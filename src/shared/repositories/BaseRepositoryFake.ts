import BaseRepositoryInterface from './BaseRepositoryInterface';

class BaseRepositoryFake<T> implements BaseRepositoryInterface<T> {
  private count = 1;
  public items: T[] = [];

  create(partialItem: Partial<T>): T {
    return partialItem as T;
  }

  save(item: T): Promise<T> {
    return new Promise((resolve) => {
      this.items.push({ id: this.count, ...item });
      this.count += 1;
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
