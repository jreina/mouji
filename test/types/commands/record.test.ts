import robot from "robotjs";

import { record } from "../../../src/commands/record";
import { save } from "../../../src/persistence/recordings";

jest.mock("../../../src/persistence/recordings", () => ({
  save: jest.fn(),
}));

jest.mock("robotjs", () => ({ getMousePos: jest.fn() }));

jest.useFakeTimers();

const mockSave = save as jest.MockedFunction<typeof save>;
const mockRobot = robot as jest.Mocked<typeof robot>;
jest.spyOn(process, "exit").mockImplementation((code: number | undefined) => {
  throw new Error(`process exited with code ${code}`);
});

describe("record", () => {
  it("should record mouse movement", () => {
    const positions = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];
    const interval = 10;
    const filename = "test";

    expect(() => {
      record({ interval, filename });
      positions.forEach((position) => {
        mockRobot.getMousePos.mockReturnValueOnce(position);
      });
      jest.advanceTimersByTime(interval);
      jest.advanceTimersByTime(interval);
      jest.advanceTimersByTime(interval);

      process.emit("SIGINT");
    }).toThrow("process exited with code 0");
    expect(mockSave).toBeCalledWith(
      { data: positions, meta: { interval } },
      filename
    );
  });
});
