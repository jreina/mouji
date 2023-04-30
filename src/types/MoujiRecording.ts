import Joi from "joi";
import { CursorLocation } from "./CursorLocation";

export type MoujiRecording = {
  data: Array<CursorLocation>;
  meta: { interval: number };
};

/**
 * A serialized V1 recording. This is the format that is stored on disk.
 *
 * This type of recording only stores the x and y coordinates of the cursor.
 */
export type SerializedMoujiRecording = {
  meta: { interval: number };
  points: Array<[number, number]>;
};

/**
 * Joi validator for a V1 serialized recording.
 */
export const SerializedMoujiRecordingValidator =
  Joi.object<SerializedMoujiRecording>({
    meta: Joi.object({
      interval: Joi.number().required(),
    }).required(),
    points: Joi.array()
      .items(Joi.array().items(Joi.number()).length(2))
      .required(),
  });

/**
 * Serialize a recording to a string. This is the inverse of deserializeRecording.
 */
export function serializeRecording(recording: MoujiRecording): string {
  const points = recording.data.map<[number, number]>(({ x, y }) => [x, y]);
  return JSON.stringify({
    meta: {
      interval: recording.meta.interval,
    },
    points,
  });
}

/**
 * Deserialize a recording from a string. This is the inverse of serializeRecording.
 *
 * In the future, this function will be able to deserialize recordings from different versions which might include events in the recording.
 */
export function deserializeRecording(recording: string): MoujiRecording {
  const raw = JSON.parse(recording);

  const rec = SerializedMoujiRecordingValidator.validate(raw);

  if (rec.error) {
    throw new Error(rec.error.message);
  }

  const data = rec.value.points.map(([x, y]) => {
    return { x, y };
  });

  return { data, meta: rec.value.meta };
}
