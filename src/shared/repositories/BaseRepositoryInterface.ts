interface BaseRepositoryInterface<T> {
  create(secret: Partial<T>): T;
  save(secret: T): Promise<T>;
  index(): Promise<T[]>;
}

export default BaseRepositoryInterface;
