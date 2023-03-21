import robot from "robotjs";
import fs from "fs";
import path from "path";
import { config } from "../config/config";
import { deserializeRecording } from "../utils/recording";
import { wait } from "../utils/promise";
import recordings from "../persistence/recordings";

export async function replay({
  pause,
  recording,
}: {
  pause: number;
  recording: string;
}) {
  console.info("Replaying mouse movement.");
  console.info(`Pausing ${pause} milliseconds between replays`);

  const tracks = recordings.load(recording);

  while (true) {
    for (let item of tracks.data) {
      await wait(tracks.meta.interval);
      robot.moveMouse(item.x, item.y);
    }
    await wait(pause);
  }
}
