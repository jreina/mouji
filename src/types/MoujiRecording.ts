import { CursorLocation } from "./CursorLocation";

export type MoujiRecording = {
  data: Array<CursorLocation>;
  meta: { interval: number };
};
