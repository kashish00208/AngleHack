/*
    Tools ragistery is the base class for managing tools

    it supports following function
    -Ragistering new tools
    -retreiving tools by id
    -listing all existing tools
    -filtering all tools and managing them

*/

import { Config } from "./config";

export interface Tool {
    id:string,
    name:string,
    description:string,
    exicute:(...args:any[])=>Promise<any>
}

export class ToolRagistery {
    private tools:Map<string,Tool>;
    constructor(tools ?:Tool[]){
        this.tools = new Map<string,Tool>();
        if(tools){
            for(const tool of tools){
                this.tools.set(tool.id,tool);
            }
        }
    }

    addTool(tool: Tool, overWrite: boolean = false): void {
        if (this.tools.has(tool.id) && !overWrite) {
            return;
        }
        this.tools.set(tool.id, tool);
    }

    getTool(toolId:string):Tool{
        const tool = this.tools.get(toolId);
        if (!tool){
            throw new Error("Tool not foound")
        }
        return tool;
    }

    getTools():Tool[]{
        return Array.from(this.tools.values());
    }

    matchTools(query?:string,toolids?:string[]):Tool[]{
        let tools = this.getTools();
        if(toolids){
            tools = tools.filter(t=>toolids.includes(t.id))
        }
        if(query){
            tools = tools.filter(t=> t.name.includes(query)||t.description.includes(query))
        }
        return tools;
    }
    
}