export interface ICrudService<T> {
    getAll(): Promise<T[]>;
    save(item: T): Promise<void>;
    get(id: number): Promise<T>;
}