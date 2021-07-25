import {Shape} from "./shape";
import {Transform} from "../transform/transform";
import {Color} from "../color";

export class Circle implements Shape {
  constructor(
    public radius: number,
    public fill?: Color,
    public stroke?: Color
  ) {
  }

  draw(context: CanvasRenderingContext2D, transform: Transform): void {
    if (this.fill) {
      context.fillStyle = this.fill.toString('rgba');
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

    if (this.stroke) {
      context.strokeStyle = this.stroke.toString('rgba');
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
