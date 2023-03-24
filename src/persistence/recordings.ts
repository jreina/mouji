import fs from "fs";
import path from "path";
import { MoujiRecording } from "../types/MoujiRecording";
import { info, verbose } from "../utils/logger";
import { deserializeRecording, serializeRecording } from "../utils/recording";

export function load(recording: string): MoujiRecording {
  const file = path.join(process.cwd(), `${recording}.moujirec`);
  verbose(`Reading recording from ${file}`);

  const tracks = deserializeRecording(
    fs.readFileSync(file, { encoding: "utf-8" })
  );

  verbose(`${tracks.data.length} items in recording path`);

  return tracks;
}

export function save(recording: MoujiRecording, name: string): string {
  const file = path.join(process.cwd(), `${name}.moujirec`);
  fs.writeFileSync(file, serializeRecording(recording));

  info(`Saved recording to ${file}`);
  verbose(`${recording.data.length} items in recording path`);

  return file;
}

export default { load, save };
