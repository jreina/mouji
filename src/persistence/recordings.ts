import fs from "fs";
import path from "path";
import { config } from "../config/config";
import { MoujiRecording } from "../types/MoujiRecording";
import { deserializeRecording, serializeRecording } from "../utils/recording";

function ensureMoujiTempExists(): void {
  if (!fs.existsSync(config.tmpPath)) {
    fs.mkdirSync(config.tmpPath);
  }
}

function ensureMoujiRecordingExists(): void {
  ensureMoujiTempExists();
  if (!fs.existsSync(config.recordPath)) {
    fs.mkdirSync(config.recordPath);
  }
}

export function list(): Array<string> {
  ensureMoujiRecordingExists();

  return fs
    .readdirSync(config.recordPath)
    .filter((file) => file.endsWith(".moujirec"))
    .map((file) => file.replace(".moujirec", ""));
}

export function load(recording: string): MoujiRecording {
  const file = path.join(config.recordPath, `${recording}.moujirec`);

  const tracks = deserializeRecording(
    fs.readFileSync(file, { encoding: "utf-8" })
  );

  return tracks;
}

export function save(recording: MoujiRecording): void {
  if (!fs.existsSync(config.recordPath)) {
    fs.mkdirSync(config.recordPath);
  }

  const file = path.join(config.recordPath, `${Date.now()}.moujirec`);

  fs.writeFileSync(file, serializeRecording(recording));
}

export default { list, load, save };
