import { Camera } from "./Camera";

import type { Coordinates, GameAsset } from "./GameAsset";
import box from "../assets/scenery/special/mystery-block.png";

export const RANGE = 50;

export class Cube implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number;
  height: number;

  useCamera: boolean = true;

  constructor(width: number, height: number, x: number = 0) {
    this.sprite = new Image();

    this.width = width;
    this.height = height;

    this.sprite = new Image();
    this.sprite.src = box;
    this.pos = { x: x, y: height / 2 };

    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth;
      this.height = this.sprite!.naturalHeight;
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
    if (keys.current?.[" "]) {
      // e
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();

    ctx.drawImage(
      this.sprite,
      this.useCamera ? camera.worldToScreenX(this.pos.x) : this.pos.x,
      this.pos.y,
      this.width,
      this.height,
    );
  }
}
