import recordings from "../persistence/recordings";
import { logger } from "../utils/logger";

export function listRecordings() {
  logger.log(`Here are a list of recordings:\n${recordings.list().join("\n")}`);
}
