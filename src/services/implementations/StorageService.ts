import { IStorageService } from "@/services/IStorageService";
import { injectable } from "tsyringe";
import localForage from "localforage";
import { DBConfigException } from "@/core/Exception/DBConfigException";

@injectable()
export class StorageService implements IStorageService {
  private static readonly dbName: string = "buy-list-app";

  async get<T>(table: string, key: string): Promise<T> {
    StorageService.config(table);

    return localForage.getItem<T>(key);
  }

  async set<T>(table: string, key: string, value: T): Promise<T> {
    StorageService.config(table);

    return localForage.setItem<T>(key, value);
  }

  async getAll<T>(table: string): Promise<T[]> {
    StorageService.config(table);

    let array: T[] = [];

    await localForage.iterate(item => {
      array.push(item as T);
    });

    return array;
  }

  async length(table: string): Promise<number> {
    StorageService.config(table);

    return localForage.length();
  }

  private static config(table: string): void {
    if (
      !localForage.config({
        driver: localForage.INDEXEDDB,
        name: StorageService.dbName,
        storeName: table
      })
    ) {
      throw new DBConfigException(table);
    }
  }
}
