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
}
export interface Config {
    portiaApiKey?:string;
    googleApiKey?:string;
    apiURL ?: string,
    groqApiKey?: string;
    model?: string;
    storageClass ?: storageClass,
    llmProvider?: "openai" | "groq" | "anthropic";
    storageDir ?: string,
    executionAgentType?: AgentType;
    planningAgentType?: AgentType;
}
export function defaultConfig() : Config  {
   return{
    portiaApiKey : process.env.PORTIA_API_KEY || "",
    apiURL : "https://api.portia.ai",
    storageClass : storageClass.MEMORY,
    llmProvider: "groq",
    groqApiKey: process.env.GROQ_API_KEY || "",
    model: process.env.MODEL || "",
   }
}
export default defaultConfig;