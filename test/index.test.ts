import PortiaSDK from "../src/main"

async function main() {
  const portia = new PortiaSDK();

  const plan = await portia.plan("Add 1 + 2");
  console.log("Plan:", plan);

  const planRun = await portia.run("Add 1 + 2");
  console.log("PlanRun:", planRun);

  try {
    await portia.resume(planRun);
  } catch (e) {
    console.log("Resume error (expected):", e.message);
  }
}

main();