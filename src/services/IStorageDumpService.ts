import { IStorageDumpServiceObject } from "@/models/IStorageDumpServiceObject";

export interface IStorageDumpService {
    import(obj: IStorageDumpServiceObject, append?: boolean): Promise<void>;

    export(): Promise<IStorageDumpServiceObject>;

    clear(): Promise<void>;
}
