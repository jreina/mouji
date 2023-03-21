import robot from "robotjs";
import { wait } from "../utils/promise";
import recordings from "../persistence/recordings";
import { verbose } from "../utils/logger";

export async function replay({
  pause,
  recording,
}: {
  pause: number;
  recording: string;
}) {
  verbose("Replaying mouse movement.");
  verbose(`Pausing ${pause} milliseconds between replays`);

  const tracks = recordings.load(recording);

  while (true) {
    for (let item of tracks.data) {
      await wait(tracks.meta.interval);
      robot.moveMouse(item.x, item.y);
    }
    await wait(pause);
  }
}
