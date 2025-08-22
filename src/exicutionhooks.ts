import Tool from "./portiaToolRagistry"

export type BeforeStepExecutionOutcome = "CONTINUE" | "SKIP";

export interface ExicutionHooks {
  clarificationHandle ?: (message:string) =>Promise<boolean>;

  beforeStepExicution ?:(
    plan:any,
    planRun:any,
    step:any,
   ) => BeforeStepExecutionOutcome;

   afterExicutionOutput ?:(
    plan:any,
    planRun:any,
    step:any,
    output:any,
   )=>void;

  
   beforePlanRun ?: (plam:any,planRun:any) =>void;

   afterPlanRun ?: (plan:any,planRun:any,output:any)=>void;

   beforeToolCall ?:(
    tool:Tool,
    args:Record<string,any>,
    planRun:any,
    step:any,
   )=>boolean;

   afterTollCall?:(
    tool:Tool,
    output:any,
    planRun:any,
    step:any
   )=>boolean
}