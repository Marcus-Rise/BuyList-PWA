export interface IStorageService {
  set<T>(table: string, key: string, value: T): Promise<T>;

  get<T>(table: string, key: string): Promise<T>;

  getAll<T>(table: string): Promise<T[]>;

  length(table: string): Promise<number>;

  clear(table: string): Promise<void>;
}
