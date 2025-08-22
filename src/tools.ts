// Example tools
import { Tool } from "./portiaToolRagistry";
export const CalculatorTool: Tool = {
  id: "calculator",
  name: "Calculator",
  description: "Performs basic arithmetic",
  execute: async (a: number, b: number) => a + b,
};

export const FileWriterTool: Tool = {
  id: "file-writer",
  name: "File Writer",
  description: "Writes content to a file",
  execute: async (filename: string, content: string) => {
    // stub
    return `File ${filename} written.`;
  },
};

export const LLMTool: Tool = {
  id: "llm",
  name: "LLM",
  description: "Calls a large language model",
  execute: async (prompt: string) => {
    return `Generated response for: ${prompt}`;
  },
};
