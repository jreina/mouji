import robot from "robotjs";
import fs from "fs";
import { CursorLocation } from "../types/CursorLocation";
import path from "path";
import { config } from "../config/config";
import { serializeRecording } from "../utils/recording";
import recordings from "../persistence/recordings";

export function record({ interval }: { interval: number }) {
  console.info("Recording mouse movement.");
  console.info(`Polling duration set to ${interval} milliseconds`);
  console.info("Press CTRL+C to finish.");
  const positions: Array<CursorLocation> = [];
  setInterval(() => {
    positions.push(robot.getMousePos());
  }, interval);

  process.on("SIGINT", () => {
    console.log("wrapping up recording...");

    recordings.save({ data: positions, meta: { interval } });
    process.exit();
  });
}
