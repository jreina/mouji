import robot from "robotjs";
import { log } from "../utils/log";

export function shake({ interval, bound }: any) {
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
}
