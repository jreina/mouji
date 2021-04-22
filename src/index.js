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
  .option(
    "-t, --stop-time <time>",
    "Specify the system time at which you'd like the program to exit. Use the format: HH:MM, e.g. 5:30 PM -> 17:30. If the time entered is before the current time, the time will apply to tomorrow. Default is never."
  )
  .option("-v, --verbose", "Enable verbose logging. Disabled by default")
  .parse();

const { interval, bound, verbose, stopTime } = program.opts();
const { height, width } = robot.getScreenSize();
const clampToScreenHeight = clamp(0, height);
const clampToScreenWidth = clamp(0, width);

function log(...args) {
  if (verbose) console.log(new Date().toISOString(), ...args);
}

log(`Starting up`);
log(`Detected screen dimensions: ${width}x${height}`);
log(`Performing random mouse action every ${interval} seconds`);
log(`Will stop at ${stopTime}`)
log(`Max delta ${bound}px`);

const handleInterval = () => {
  const deltaX = Math.ceil(Math.random() * bound * randomSign());
  const deltaY = Math.ceil(Math.random() * bound * randomSign());
  log(`Generated deltas (x, y) = (${deltaX}, ${deltaY})`);
  const { x: currX, y: currY } = robot.getMousePos();
  const x = clampToScreenWidth(currX + deltaX);
  const y = clampToScreenHeight(currY + deltaY);
  log(`Moving mouse to (${x}, ${y})`);
  robot.moveMouse(x, y);
};

function clamp(min, max) {
  return function (x) {
    return x < min ? min : x > max ? max : x;
  };
}

function randomSign() {
  return 0.5 - Math.random() > 0 ? 1 : -1;
}

const stopTimeInMs = () => {
  const now = new Date();
  const nowMut = new Date();

  const [hours, minutes] = stopTime.split(':');

  nowMut.setHours(hours)
  nowMut.setMinutes(minutes);

  const shouldBeForTomorrow = now.getTime() > nowMut.getTime();
  if (shouldBeForTomorrow) {
    nowMut.setDate(nowMut.getDate() + 1);
  }

  return nowMut.getTime() - now.getTime();
};

const handleTimeout = () => {
  log('Stopping')
  process.exit(0);
}

setInterval(handleInterval, interval * 1000);

if (stopTime) {
  setTimeout(handleTimeout, stopTimeInMs());
}
