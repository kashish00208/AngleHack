import { Config } from "./config";
import { Tool , ToolRegistry } from "./portiaToolRagistry";
import { CalculatorTool, FileWriterTool, LLMTool } from "./tools";

// Default registry with built-in tools
export class DefaultToolRegistry extends ToolRegistry {
  constructor(config?: Config) {
    const tools: Tool[] = [CalculatorTool, FileWriterTool, LLMTool];
    super(tools);
  }
}
