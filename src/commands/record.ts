import robot from "robotjs";
import { CursorLocation } from "../types/CursorLocation";
import recordings from "../persistence/recordings";
import { verbose } from "../utils/logger";

export function record({ interval }: { interval: number }) {
  verbose("Recording mouse movement.");
  verbose(`Polling duration set to ${interval} milliseconds`);
  verbose("Press CTRL+C to finish.");
  const positions: Array<CursorLocation> = [];
  setInterval(() => {
    positions.push(robot.getMousePos());
  }, interval);

  process.on("SIGINT", () => {
    verbose("wrapping up recording...");

    recordings.save({ data: positions, meta: { interval } });

    process.exit();
  });
}
