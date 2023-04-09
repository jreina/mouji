import fs from "fs";
import path from "path";
import { MoujiRecording } from "../types/MoujiRecording";
import { info, verbose } from "../utils/logger";
import {
  deserializeRecording,
  serializeRecording,
} from "../types/MoujiRecording";

export function load(recording: string): MoujiRecording {
  const file = path.resolve(process.cwd(), recording);
  verbose(`Reading recording from ${file}`);

  const tracks = deserializeRecording(
    fs.readFileSync(file, { encoding: "utf-8" })
  );

  verbose(`${tracks.data.length} items in recording path`);

  return tracks;
}

export function save(recording: MoujiRecording, name: string): string {
  fs.writeFileSync(name, serializeRecording(recording));

  info(`Saved recording to ${name}`);
  verbose(`${recording.data.length} items in recording path`);

  return name;
}

export default { load, save };
