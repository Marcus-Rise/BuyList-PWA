import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";
import { IThemeService } from "@/services/IThemeService";

@injectable()
export class ThemeService implements IThemeService {
    private readonly table: string = "settings";
    private readonly key: string = "themeIsDark";

    async getIsDark(): Promise<boolean> {
        let isDark = await this.storageService.get<boolean>(this.table, this.key);

        if (isDark === null) {
            isDark = false;

            await this.storageService.set<boolean>(this.table, this.key, isDark);
        }

        return isDark;
    }

    constructor(
        @inject("IStorageService")
        private readonly storageService: IStorageService
    ) {
    }

    async toggle(): Promise<boolean> {
        const isDark: boolean = await this.getIsDark();

        return this.storageService.set<boolean>(this.table, this.key, !isDark);
    }
}
