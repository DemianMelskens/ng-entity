import {Shape} from "./shape";
import {Transform} from "../transform/transform";
import {Color} from "../color";

export class Rectangle implements Shape {
  constructor(
    public width: number,
    public height: number
  ) {
  }

  draw(context: CanvasRenderingContext2D, transform: Transform, fill?: Color, stroke?: Color): void {
    if (fill) {
      context.fillStyle = fill.toString('rgba');
      context.fillRect(
        transform.position.x,
        transform.position.y,
        this.width,
        this.height
      );
    }

    if (stroke) {
      context.strokeStyle = stroke.toString('rgba');
      context.strokeRect(
        transform.position.x,
        transform.position.y,
        this.width,
        this.height
      );
    }
  }
}
