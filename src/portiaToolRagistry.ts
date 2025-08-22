/*
   ToolRegistry is the base class for managing tools.
   - Register new tools
   - Retrieve tools by id
   - List all existing tools
   - Match/filter tools
*/

export interface Tool {
  id: string;
  name: string;
  description: string;
  execute: (...args: any[]) => Promise<any>;
}

export class ToolRegistry {
  private tools: Map<string, Tool>;

  constructor(tools?: Tool[]) {
    this.tools = new Map<string, Tool>();
    if (tools) {
      for (const tool of tools) {
        this.tools.set(tool.id, tool);
      }
    }
  }

  addTool(tool: Tool, overwrite: boolean = false): void {
    if (this.tools.has(tool.id) && !overwrite) {
      return;
    }
    this.tools.set(tool.id, tool);
  }

  getTool(toolId: string): Tool {
    const tool = this.tools.get(toolId);
    if (!tool) {
      throw new Error("Tool not found");
    }
    return tool;
  }

  getTools(): Tool[] {
    return Array.from(this.tools.values());
  }

  matchTools(query?: string, toolIds?: string[]): Tool[] {
    let tools = this.getTools();
    if (toolIds) {
      tools = tools.filter((t) => toolIds.includes(t.id));
    }
    if (query) {
      tools = tools.filter(
        (t) => t.name.includes(query) || t.description.includes(query)
      );
    }
    return tools;
  }
}

export default ToolRegistry;
