import robot from "robotjs";

import { load } from "../../../src/persistence/recordings";
import { replay } from "../../../src/commands/replay";

jest.useFakeTimers();
jest.mock("robotjs", () => ({ moveMouse: jest.fn() }));
jest.mock("../../../src/persistence/recordings", () => ({
  load: jest.fn(),
}));

const mockLoad = load as jest.MockedFunction<typeof load>;
const mockRobot = robot as jest.Mocked<typeof robot>;
jest.spyOn(process, "exit").mockImplementation((code: number | undefined) => {
  throw new Error(`process exited with code ${code}`);
});

describe("replay", () => {
  // TODO: fix this test
  it.skip("should replay mouse movement", async () => {
    const interval = 10;
    const pause = 100;
    const recording = "test";

    mockLoad.mockReturnValueOnce({
      data: [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ],
      meta: {
        interval,
      },
    });

    // TODO: the inner function was returning a function that was supposed to stop the interval
    // and wrapped in a function that returned void so it could be used as a command.
    // const { stop } = await replay({ pause, recording });

    jest.advanceTimersByTime(pause);
    jest.advanceTimersByTime(interval);
    jest.advanceTimersByTime(interval);

    // stop();
    await Promise.resolve();

    expect(mockRobot.moveMouse).toHaveBeenNthCalledWith(1, 1, 2);
    expect(mockRobot.moveMouse).toHaveBeenNthCalledWith(2, 3, 4);
  });
});
