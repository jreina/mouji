import path from "path";
import os from "os";

const tmpPath = path.join(os.tmpdir(), ".mouji");
const recordPath = path.join(tmpPath, "recordings");

export const config = {
  tmpPath,
  recordPath,
};
