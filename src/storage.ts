import { EndUser } from "./endUser";

export interface Storage {
  saveEndUser(user: EndUser): EndUser;
  asaveEndUser(user: EndUser): Promise<EndUser>;
  asavePlanRun(planRun: any): Promise<any>;
  savePlanRun(planRun: any): any;
  getPlan(id: string): any;
  savePlan(plan: any): any;
}

export class InMemoryStorage implements Storage {
  private users: EndUser[] = [];
  private planRuns: Record<string, any> = {};
  private plans: Record<string, any> = {};
  saveEndUser(user: EndUser): EndUser {
    this.users.push(user);
    return user;
  }
  async asaveEndUser(user: EndUser): Promise<EndUser> {
    this.users.push(user);
    return user;
  }
  savePlanRun(planRun: any): any {
    this.planRuns[planRun.id] = planRun;
    return planRun;
  }
   asavePlanRun(planRun: any): Promise<any> {
    this.planRuns[planRun.id] = planRun;
    return Promise.resolve(planRun);
  }
    getPlanRun(id: string): any {
    return this.planRuns[id];
  }

  getPlan(id: string): any {
    return this.plans[id];
  }
  savePlan(plan: any) {
    this.plans[plan.id] = plan;
    return plan;
  }
}
