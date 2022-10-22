export interface BaseService<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T>;
}
