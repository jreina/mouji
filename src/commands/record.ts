import robot from "robotjs";
import { CursorLocation } from "../types/CursorLocation";
import recordings from "../persistence/recordings";
import { verbose, info } from "../utils/logger";

export function record({
  interval,
  filename,
}: {
  interval: number;
  filename: string;
}): void {
  info("Recording mouse movement.");
  verbose(`Polling duration set to ${interval} milliseconds`);
  info("Press CTRL+C to finish.");
  const positions: Array<CursorLocation> = [];
  setInterval(() => {
    positions.push(robot.getMousePos());
  }, interval);

  process.on("SIGINT", () => {
    info("wrapping up recording...");

    recordings.save({ data: positions, meta: { interval } }, filename);

    process.exit(0);
  });
}
