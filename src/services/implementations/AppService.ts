import { IAppService } from "@/services/IAppService";

export class AppService implements IAppService {
  readonly version: string;
  readonly author: string;

  constructor() {
    this.version = process.env.VUE_APP_VERSION;
    this.author = process.env.VUE_APP_AUTHOR;
  }
}
