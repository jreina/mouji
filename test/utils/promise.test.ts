import { wait } from "../../src/utils/promise";

describe("wait", () => {
  it("should wait", async () => {
    const duration = 100;
    const start = Date.now();
    await wait(duration);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(duration);
  });
});
