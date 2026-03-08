import { Camera } from "./Camera";

import type { Coordinates, GameAsset } from "./GameAsset";
import cloud from "../assets/scenery/clouds/clouds.png";

export const RANGE = 50;

export class Cloud implements GameAsset {
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
    this.sprite.src = cloud;
    this.pos = { x: x, y: 0 };

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
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
