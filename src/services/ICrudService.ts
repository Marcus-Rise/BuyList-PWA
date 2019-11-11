export interface ICrudService<T> {
  getAll(): Promise<T[]>;
  save(item: T): Promise<T>;
  get(id: number): Promise<T>;
  clear(): Promise<void>;
}
