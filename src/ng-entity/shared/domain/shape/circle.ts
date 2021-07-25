import {Shape} from "./shape";
import {Transform} from "../transform/transform";
import {Color, Stroke} from "../color";
import {nonNegative} from '../../utils';

export class Circle implements Shape {
  constructor(
    public radius: number,
    public fill?: Color,
    public stroke?: Stroke
  ) {
  }

  draw(context: CanvasRenderingContext2D, transform: Transform): void {
    if (this.fill) {
      context.fillStyle = this.fill.toString();
      context.beginPath();
      context.arc(
        transform.position.x,
        transform.position.y,
        nonNegative(this.radius),
        0,
        Math.PI * 2,
        true
      );
      context.fill();
    }

    if (this.stroke) {
      context.strokeStyle = this.stroke.color.toString();
      context.lineWidth = nonNegative(this.stroke.width);

      context.beginPath();
      context.arc(
        transform.position.x,
        transform.position.y,
        nonNegative(this.radius),
        0,
        Math.PI * 2,
        true
      );
      context.stroke();
    }
  }
}
