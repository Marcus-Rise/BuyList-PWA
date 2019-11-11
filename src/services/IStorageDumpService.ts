import { IStorageDumpServiceObject } from "@/models/IStorageDumpServiceObject";

export interface IStorageDumpService {
    dumpImport(obj: IStorageDumpServiceObject, append?: boolean): Promise<void>;

    dumpExport(): Promise<IStorageDumpServiceObject>;
}
