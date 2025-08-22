import { Config, defaultConfig, storageClass } from "./config";
import { Tool, ToolRegistry } from "./portiaToolRagistry";
import { ExicutionHooks } from "./exicutionhooks";
import {BaseProductTelemetry , NoopTelemetry} from './BaseProductTelemetry'
import { InMemoryStorage, DiskFileStorage, CloudStorage, Storage } from "./storage";
import { EndUser } from "./endUser";
import { DefaultToolRegistry } from "./ToolRagistery";

export class Portia {
  private config: Config;
  private toolRegistry: ToolRegistry;
  private hooks: ExicutionHooks;
  private telemetry: BaseProductTelemetry;
  private storage: Storage;

  constructor(
    config: Config = defaultConfig(),
    tools?: ToolRegistry | Tool[],
    hooks: ExicutionHooks = {},
    telemetry: BaseProductTelemetry = new NoopTelemetry()
  ) {
    // 1. Config
    this.config = config;

    console.log(`Starting Portia SDK v1.0.0`);
    if (this.config.portiaApiKey && this.config.apiURL) {
      console.log(`Using Portia cloud API endpoint: ${this.config.apiURL}`);
    }

    // 2. Telemetry + hooks
    this.telemetry = telemetry;
    this.hooks = hooks;

    // 3. Tools
    if (tools instanceof ToolRegistry) {
      this.toolRegistry = tools;
    } else if (Array.isArray(tools)) {
      this.toolRegistry = new ToolRegistry(tools);
    } else {
      this.toolRegistry = new DefaultToolRegistry(this.config);
    }

    // 4. Storage (simplified)
    switch (this.config.storageClass) {
      case storageClass.DISK:
        this.storage = new DiskFileStorage(this.config.storageDir);
        break;
      case storageClass.CLOUD:
        this.storage = new CloudStorage(this.config);
        break;
      case storageClass.MEMORY:
      default:
        this.storage = new InMemoryStorage();
    }
  }

  // Sync user init
  initializeEndUser(endUser?: string | EndUser): EndUser {
    const defaultId = "portia:default_user";

    if (typeof endUser === "string") {
      const id = endUser === "" ? defaultId : endUser;
      return this.storage.saveEndUser(new EndUser(id));
    }

    if (!endUser) {
      return this.storage.saveEndUser(new EndUser(defaultId));
    }

    return this.storage.saveEndUser(endUser);
  }

  // Async version
  async ainitializeEndUser(endUser?: string | EndUser): Promise<EndUser> {
    const defaultId = "portia:default_user";

    if (typeof endUser === "string") {
      const id = endUser === "" ? defaultId : endUser;
      return await this.storage.asaveEndUser(new EndUser(id));
    }

    if (!endUser) {
      return await this.storage.asaveEndUser(new EndUser(defaultId));
    }

    return await this.storage.asaveEndUser(endUser);
  }
}
