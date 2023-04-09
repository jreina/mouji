import robot from "robotjs";
import { verbose } from "../utils/logger";

export function shake({ interval, bound }: { interval: number; bound: number }): void {
  verbose(`Performing random mouse action every ${interval} seconds`);
  verbose(`Max delta ${bound}px`);

  const handleInterval = () => {
    const deltaX = Math.ceil(Math.random() * bound * randomSign());
    const deltaY = Math.ceil(Math.random() * bound * randomSign());
    verbose(`Generated deltas (x, y) = (${deltaX}, ${deltaY})`);
    const { x: currX, y: currY } = robot.getMousePos();
    const x = currX + deltaX;
    const y = currY + deltaY;
    verbose(`Moving mouse to (${x}, ${y})`);
    robot.moveMouse(x, y);
  };

  function randomSign() {
    return 0.5 - Math.random() > 0 ? 1 : -1;
  }

  setInterval(handleInterval, interval * 1000);
}
