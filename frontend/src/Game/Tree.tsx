import { Camera } from "./Camera";

import type { Coordinates, GameAsset } from "./GameAsset";
import { GROUND_Y } from "./Constants";
import largeTree from "../assets/scenery/trees/large-tree.png";

export const RANGE = 50;

export class Tree implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number;
  height: number;
  alive: boolean = true;

  useCamera: boolean = true;

  constructor(width: number, height: number, type: string, x: number = 0) {
    this.sprite = new Image();

    this.width = width;
    this.height = height;

    this.sprite = new Image();
    this.sprite.src = type;
    this.pos = { x: x, y: 0 };

    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth;
      this.height = this.sprite!.naturalHeight;
      this.pos = { x: x, y: GROUND_Y - this.height };
    };

    console.log(this.pos);
  }

  inRangeOf(coordinates: Coordinates): boolean {
    return (
      coordinates.x < this.pos.x + RANGE * 2 &&
      coordinates.x > this.pos.x - RANGE / 2
    );
  }

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    // Player cut tree
    if (keys.current?.[" "] && this.sprite.src !== largeTree && this.alive) {
      this.pos.y += 2;
      if (this.pos.y > GROUND_Y) {
        this.alive = false;
        console.log("TREE KILLED");
      }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();

    if (this.alive)
      ctx.drawImage(
        this.sprite,
        this.useCamera ? camera.worldToScreenX(this.pos.x) : this.pos.x,
        this.pos.y,
        this.width,
        this.height,
      );
  }
}
