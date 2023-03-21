import { CursorLocation } from "../types/CursorLocation";
import { MoujiRecording } from "../types/MoujiRecording";

export function serializeRecording(recording: MoujiRecording): string {
  return (
    recording.meta.interval +
    "||" +
    recording.data.flatMap((pos) => `${pos.x},${pos.y}`).join("|")
  );
}
export function deserializeRecording(recording: string): MoujiRecording {
  const [header, records] = recording.split("||");

  const data = records.split("|").map((item) => {
    const [x, y] = item.split(",");
    return { x: +x, y: +y };
  });

  return { data, meta: { interval: +header } };
}
