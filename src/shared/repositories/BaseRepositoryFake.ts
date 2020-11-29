import { DeepPartial } from 'typeorm';
import BaseRepositoryInterface from './BaseRepositoryInterface';

class BaseRepositoryFake<T> implements BaseRepositoryInterface<T> {
  private count = 1;
  public items: T[] = [];

  create(partialItem: DeepPartial<T>): T {
    return partialItem as T;
  }

  save(item: T): Promise<T> {
    return new Promise((resolve) => {
      if ((item as any).id) {
        const index = this.items.findIndex(
          (currentItem: any) => currentItem.id === (item as any).id,
        );

        if (index) {
          this.items[index] === item;
          return item;
        }
      }

      (item as any).id = this.count;
      this.count += 1;

      this.items.push(item);
      resolve(item);
    });
  }

  index(): Promise<T[]> {
    return new Promise((resolve) => {
      resolve(this.items);
    });
  }

  findById(id: number | string): Promise<T> {
    return new Promise((resolve) => {
      resolve(
        this.items.find((item: any) => {
          return item.id === id;
        }),
      );
    });
  }

  findByIds(ids: number[] | string[]): Promise<T[]> {
    return new Promise((resolve) => {
      resolve(
        this.items.filter((item: any) => {
          return (ids as any[]).includes(item.id);
        }),
      );
    });
  }
}

export default BaseRepositoryFake;
