import { Camera } from "./Camera";
import { GROUND_Y } from "./Constants";

import type { Coordinates, GameAsset } from "./GameAsset";

export const RANGE = 50;

export class Stuff implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number;
  height: number;

  useCamera: boolean = true;

  constructor(width: number, height: number, sprite: string, x: number = 0) {
    this.sprite = new Image();

    this.width = width;
    this.height = height;

    this.sprite = new Image();
    this.sprite.src = sprite;
    this.pos = { x: x, y: 200 };

    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth;
      this.height = this.sprite!.naturalHeight;
      this.pos = { x: x, y: GROUND_Y - this.height };
    };

    console.log(this);
  }

  inRangeOf(coordinates: Coordinates): boolean {
    return (
      coordinates.x < this.pos.x + RANGE * 2 &&
      coordinates.x > this.pos.x - RANGE / 2
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();
    // console.log(this.sprite, this.pos.y);

    ctx.drawImage(
      this.sprite,
      this.useCamera ? camera.worldToScreenX(this.pos.x) : this.pos.x,
      this.pos.y,
      this.width,
      this.height,
    );
  }
}
