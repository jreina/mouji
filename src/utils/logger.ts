export function info(...args: Array<unknown>) {
  console.log(new Date().toISOString(), ...args);
}

export function verbose(...args: Array<unknown>) {
  if (process.env.MOUJI_VERBOSE === "true") {
    console.info(new Date().toISOString(), ...args);
  }
}

export const logger = {
  verbose,
  info,
  log: info,
} as const;
