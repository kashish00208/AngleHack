/* 

Configuration file for classes and functions used in SDK
Settings it includes are : API_key , LLM Providers , agent option now 
and default configuration files for it

*/

import dotenv from 'dotenv'
dotenv.config();

export enum AgentType {
    DEFAULT="DEFAULT"
}
export interface GenerativeModelsConfig {
    defaultmodel?:string,
    planningmodel?:string,
    exicutionmodel?:string,
    introspectionmodel?:string,
    summarizermodel?:string,
}
export interface Config {
    portiaApiKey?:string;
    openaiApiKey?:string;
    anthropicApiKey?:string;
    googleApiKey?:string;
    llmProviders?:string;
    models?:GenerativeModelsConfig;
    executionAgentType?: AgentType;
    planningAgentType?: AgentType;
}
export const defaultConfig : Config = {
    executionAgentType: AgentType.DEFAULT,
    planningAgentType: AgentType.DEFAULT,
    models: {},
}
export default defaultConfig;