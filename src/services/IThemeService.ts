export interface IThemeService {
    getIsDark(): Promise<boolean>;

    toggle(): Promise<boolean>;
}

