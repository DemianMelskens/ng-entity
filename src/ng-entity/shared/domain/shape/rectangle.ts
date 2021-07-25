import {Shape} from "./shape";
import {Transform} from "../transform/transform";
import {Color, Stroke} from "../color";
import {nonNegative} from '../../utils';

export class Rectangle implements Shape {
  constructor(
    public width: number,
    public height: number,
    public fill?: Color,
    public stroke?: Stroke
  ) {
  }

  draw(context: CanvasRenderingContext2D, transform: Transform): void {
    if (this.fill) {
      context.fillStyle = this.fill.toString();
      context.fillRect(
        transform.position.x,
        transform.position.y,
        nonNegative(this.width),
        nonNegative(this.height)
      );
    }

    if (this.stroke) {
      context.strokeStyle = this.stroke.color.toString();
      context.lineWidth = nonNegative(this.stroke.width);
      context.strokeRect(
        transform.position.x,
        transform.position.y,
        nonNegative(this.width),
        nonNegative(this.height)
      );
    }
  }
}
