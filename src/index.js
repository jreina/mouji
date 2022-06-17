#!/usr/bin/env node

const robot = require("robotjs");
const { program } = require("commander");

program
  .name("mouji")
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
  .option("-v, --verbose", "Enable verbose logging. Disabled by default")
  .parse();

const { interval, bound, verbose } = program.opts();

function log(...args) {
  if (verbose) console.log(new Date().toISOString(), ...args);
}

log(`Starting up`);
log(`Performing random mouse action every ${interval} seconds`);
log(`Max delta ${bound}px`);

const handleInterval = () => {
  const deltaX = Math.ceil(Math.random() * bound * randomSign());
  const deltaY = Math.ceil(Math.random() * bound * randomSign());
  log(`Generated deltas (x, y) = (${deltaX}, ${deltaY})`);
  const { x: currX, y: currY } = robot.getMousePos();
  const x = currX + deltaX;
  const y = currY + deltaY;
  log(`Moving mouse to (${x}, ${y})`);
  robot.moveMouse(x, y);
};

function randomSign() {
  return 0.5 - Math.random() > 0 ? 1 : -1;
}

setInterval(handleInterval, interval * 1000);
