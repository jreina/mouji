export function log(...args: Array<any>) {
  console.log(new Date().toISOString(), ...args);
}

export function getLogger(verbose: boolean) {
  if (verbose) {
    return log;
  }
  return () => {};
}
