import {Shape} from "./shape";
import {Transform} from "../transform/transform";
import {Color} from "../color";

export class Circle implements Shape {
  constructor(
    public radius: number,
  ) {
  }

  draw(context: CanvasRenderingContext2D, transform: Transform, fill?: Color, stroke?: Color): void {
    if (fill) {
      context.fillStyle = fill.toString('rgba');
      context.beginPath();
      context.arc(
        transform.position.x,
        transform.position.y,
        this.radius,
        0,
        Math.PI * 2,
        true
      );
      context.fill();
    }

    if (stroke) {
      context.strokeStyle = stroke.toString('rgba');
      context.beginPath();
      context.arc(
        transform.position.x,
        transform.position.y,
        this.radius,
        0,
        Math.PI * 2,
        true
      );
      context.stroke();
    }
  }
}
