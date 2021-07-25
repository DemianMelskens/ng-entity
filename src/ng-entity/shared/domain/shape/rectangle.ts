import {Shape} from "./shape";
import {Transform} from "../transform/transform";
import {Color} from "../color";

export class Rectangle implements Shape {
  constructor(
    public width: number,
    public height: number,
    public fill?: Color,
    public stroke?: Color
  ) {
  }

  draw(context: CanvasRenderingContext2D, transform: Transform): void {
    if (this.fill) {
      context.fillStyle = this.fill.toString('rgba');
      context.fillRect(
        transform.position.x,
        transform.position.y,
        this.width,
        this.height
      );
    }

    if (this.stroke) {
      context.strokeStyle = this.stroke.toString('rgba');
      context.strokeRect(
        transform.position.x,
        transform.position.y,
        this.width,
        this.height
      );
    }
  }
}
