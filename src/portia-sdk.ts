import { Config, defaultConfig, storageClass } from "./config";
import { Tool, ToolRegistry } from "./portiaToolRagistry";
import { ExicutionHooks } from "./exicutionhooks";
import { BaseProductTelemetry, NoopTelemetry } from "./BaseProductTelemetry";
import {
  InMemoryStorage,
  Storage,
} from "./storage";
import { EndUser } from "./endUser";
import { DefaultToolRegistry } from "./ToolRagistery";

export interface Plan {
  id: string;
  query: string;
  steps: any[];
  inputs?: Record<string, any>;
}

export interface PlanRun {
  id: string;
  planId: string;
  endUserId?: string;
  outputs?: Record<string, any>;
  state:
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "COMPLETE"
    | "FAILED"
    | "NEED_CLARIFICATION"
    | "READY_TO_RESUME";
  currentStepIndex?: number;
}

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

    this.storage = new InMemoryStorage();
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

  async plan(
    query: string,
    options?: {
      tools?: Tool[] | string[];
      endUser?: string | EndUser;
      inputs?: Record<string, any>;
    }
  ): Promise<Plan> {
    const tools = options?.tools || this.toolRegistry.matchTools(query);
    const plan: Plan = {
      id: `plan-${Date.now()}`,
      query,
      steps: [],
      inputs: options?.inputs,
    };
    this.storage.savePlan(plan);
    return plan;
  }

  async run(
    query: string,
    options?: {
      tools?: Tool[] | string[];
      endUser?: string | EndUser;
      inputs?: Record<string, any>;
    }
  ): Promise<PlanRun> {
    const plan = await this.plan(query, options);
    const endUser = await this.ainitializeEndUser(options?.endUser);
    const planRun: PlanRun = {
      id: `planrun-${Date.now()}`,
      planId: plan.id,
      endUserId: endUser.id,
      state: "NOT_STARTED",
      currentStepIndex: 0,
      outputs: {},
    };
    this.storage.savePlanRun(planRun);
    return this.executePlanRun(plan, planRun);
  }

  async resume(planRun: PlanRun): Promise<PlanRun> {
    if (
      planRun.state !== "READY_TO_RESUME" &&
      planRun.state !== "NEED_CLARIFICATION"
    ) {
      throw new Error("PlanRun is not in a resumable state");
    }
    return this.executePlanRun(
      await this.storage.getPlan(planRun.planId),
      planRun
    );
  }

  private async executePlanRun(plan: Plan, planRun: PlanRun): Promise<PlanRun> {
    planRun.state = "IN_PROGRESS";
    for (let i = planRun.currentStepIndex || 0; i < plan.steps.length; i++) {
      const step = plan.steps[i];
      console.log(`Executing step: ${JSON.stringify(step)}`);
      planRun.currentStepIndex = i;
    }
    planRun.state = "COMPLETE";
    this.storage.savePlanRun(planRun);
    return planRun;

  }
}