import { IStorageService } from "@/services/IStorageService";
import { injectable } from "tsyringe";
import localForage from "localforage";

@injectable()
export class StorageService implements IStorageService {
  private readonly dbName: string = "buy-list-app";

  async get<T>(table: string, key: string): Promise<T> {
    return this.db(table).getItem<T>(key);
  }

  async set<T>(table: string, key: string, value: T): Promise<T> {
    return this.db(table).setItem<T>(key, value);
  }

  async getAll<T>(table: string): Promise<T[]> {
    const array: T[] = [];

    await this.db(table).iterate(item => {
      array.push(item as T);
    });

    return array;
  }

  async length(table: string): Promise<number> {
    return this.db(table).length();
  }

  private db(table: string): LocalForage {
    return localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: this.dbName,
      storeName: table
    });
  }
}
