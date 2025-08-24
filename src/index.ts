import PortiaSDK from "./Portia";
import { defaultConfig } from "./config";
import { CalculatorTool, FileWriterTool, LLMTool } from "./tools";

async function main() {
  // Init SDK with just the 3 tools
  const sdk = new PortiaSDK(defaultConfig(), [
    CalculatorTool,
    FileWriterTool,
    LLMTool,
  ]);

  // Complex multi-step query
  const query = `
    Calculate the sum of (25 + 75) and (300 + 120).
    Then, explain the result in natural language using the LLM.
    Finally, save the explanation into a file called "math-summary.txt".
  `;

  // Generate a plan (Portia will break this into structured steps)
  const plan = await sdk.plan(query, {
    tools: [CalculatorTool, FileWriterTool, LLMTool],
  });
  console.log("Generated Plan:", plan);

  // Run the plan (executes step-by-step with tools)
  const run = await sdk.run(query, {
    tools: [CalculatorTool, FileWriterTool, LLMTool],
  });
  console.log("Plan Run Result:", run);

  // Try resuming if needed
  try {
    await sdk.resume(run);
  } catch (e) {
    if (e instanceof Error) {
      console.log("Resume error (expected):", e.message);
    } else {
      console.log("Resume error (expected):", e);
    }
  }
}

main();
