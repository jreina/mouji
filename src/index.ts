#!/usr/bin/env node

import { program } from "commander";
import { record } from "./commands/record";
import { replay } from "./commands/replay";
import { shake } from "./commands/shake";

program.name("mouji").option<boolean>(
  "-v, --verbose",
  "Enable verbose logging. Disabled by default",
  () => {
    process.env.MOUJI_VERBOSE = "true";
    return true;
  },
  false
);

program
  .command("shake")
  .action(shake)
  .option(
    "-i, --interval <seconds>",
    "Specify the number of seconds to wait between a mouse action. Default is 60",
    (x) => parseInt(x, 10),
    60
  )
  .option(
    "-b, --bound <px>",
    "Specify the maximum number of pixels to move for each mouse action. Default is 5",
    (x) => parseInt(x, 10),
    5
  );

program
  .command("record")
  .action(record)
  .option(
    "-i, --interval <milliseconds>",
    "Polling duration for recording in milliseconds. Default is 100ms",
    (x) => parseInt(x, 10),
    100
  )
  .option(
    "-f, --filename <filename>",
    "The file name where results should be saved. Uses the current timestamp by default",
    Date.now().toString()
  );

program
  .command("replay")
  .action(replay)
  .argument("<file>", "The recording file to replay")
  .option(
    "-p, --pause <milliseconds>",
    "Pause duration between replays in milliseconds. Default is 5000ms",
    (x) => parseInt(x, 10),
    5000
  )

program.parse();
