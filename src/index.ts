#!/usr/bin/env node

import { program } from "commander";
import { listRecordings } from "./commands/listRecordings";
import { record } from "./commands/record";
import { replay } from "./commands/replay";
import { shake } from "./commands/shake";
import { log } from "./utils/log";

program.name("mouji");

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
  )
  .option("-v, --verbose", "Enable verbose logging. Disabled by default");

program
  .command("record")
  .action(record)
  .option(
    "-i, --interval <milliseconds>",
    "Polling duration for recording in milliseconds. Default is 100ms",
    (x) => parseInt(x, 10),
    100
  );

program
  .command("replay")
  .action(replay)
  .option(
    "-p, --pause <milliseconds>",
    "Pause duration between replays in milliseconds. Default is 5000ms",
    (x) => parseInt(x, 10),
    5000
  )
  .requiredOption("-r, --recording <file>", "The recording file to replay");

program.command("list-recordings").action(listRecordings);

program.parse();
