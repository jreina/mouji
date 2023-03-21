import recordings from "../persistence/recordings";

export function listRecordings() {
  console.log(
    `Here are a list of recordings:\n${recordings.list().join("\n")}`
  );
}
