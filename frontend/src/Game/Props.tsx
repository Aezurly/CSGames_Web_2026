import { CANVAS_HEIGHT, CANVAS_WIDTH, GROUND_Y } from "./Constants";

import { Stuff as Prop } from "./Prop";
import bottle from "../assets/scenery/ground_props/bottle.png";
import bottles from "../assets/scenery/ground_props/bottles.png";
import bush from "../assets/scenery/ground_props/bush.png";
import flowery_bush from "../assets/scenery/ground_props/flowery_bush.png";

export const PROPS: string[] = [bottle, bush, flowery_bush];

// Source - https://stackoverflow.com/a/2450976
// Posted by ChristopheD, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-07, License - CC BY-SA 4.0
export function shuffle(array: string[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export class Props {
  objects: Prop[] = [];

  useCamera: boolean = true;

  constructor(positions: number[]) {
    positions.forEach((posx, i) => {
      const prop = new Prop(
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        PROPS[i % PROPS.length],
        posx,
      );
      this.objects.push(prop);
    });
    console.log(this.objects);
  }

  randomize() {
    const arr = PROPS;
    shuffle(arr);
    this.objects.forEach((prop, i) => {
      prop.sprite.src = arr[i];
      prop.pos.y = GROUND_Y - prop.sprite!.naturalHeight;
    });
    console.log(this.objects);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  render(ctx: CanvasRenderingContext2D): void {
    // console.log(this.objects);
    this.objects.forEach((prop) => {
      prop.render(ctx);
    });
  }
}
