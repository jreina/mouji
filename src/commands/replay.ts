import robot from "robotjs";
import { wait } from "../utils/promise";
import recordings from "../persistence/recordings";
import { verbose } from "../utils/logger";

export async function replay(
  file: string,
  {
    pause,
  }: {
    pause: number;
  }
): Promise<void> {
  verbose("Replaying mouse movement.");
  verbose(`Pausing ${pause} milliseconds between replays`);

  const tracks = recordings.load(file);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (const item of tracks.data) {
      await wait(tracks.meta.interval);
      robot.moveMouse(item.x, item.y);
    }
    await wait(pause);
  }
}
