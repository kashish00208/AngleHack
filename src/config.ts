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
export enum storageClass{
    MEMORY = "MEMORY",
    DISK = "DISK",
    CLOUD = "CLOUD"
}
export interface Config {
    portiaApiKey?:string;
    googleApiKey?:string;
    apiURL ?: string,
    storageClass ?: storageClass,
    storageDir ?: string,
    executionAgentType?: AgentType;
    planningAgentType?: AgentType;
}
export function defaultConfig() : Config  {
   return{
    portiaApiKey : process.env.PORTIA_API_KEY || "",
    apiURL : "https://api.portia.ai",
    storageClass : storageClass.MEMORY,
   }
}
export default defaultConfig;