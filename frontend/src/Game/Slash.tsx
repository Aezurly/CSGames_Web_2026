import { Camera } from "./Camera";
import slashSprite from "../assets/characters/slash.png";
import type { Coordinates, GameAsset } from "./GameAsset";

export const SLASH_TIME = 5;

export class Slash implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number;
  height: number;
  show: boolean = false;
  tickShown: number = 0;

  useCamera: boolean = true;

  constructor(width: number, height: number) {
    this.sprite = new Image();

    this.width = width;
    this.height = height;

    this.pos = { x: 0, y: 0 };

    this.sprite = new Image();
    this.sprite.src = slashSprite;

    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth;
      this.height = this.sprite!.naturalHeight;
    };
  }

  assignPos(pos: Coordinates) {
    this.pos = pos;
  }

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    // Player cut tree
    if (keys.current?.[" "]) {
      this.show = true;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();

    if (this.show) {
      this.tickShown++;
      ctx.drawImage(
        this.sprite,
        this.useCamera ? camera.worldToScreenX(this.pos.x) : this.pos.x,
        this.pos.y,
        this.width,
        this.height,
      );
    }
    if (this.tickShown >= SLASH_TIME) this.show = false;
  }
}
