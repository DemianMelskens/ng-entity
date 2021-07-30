import {Shape} from "./shape";
import {Color, Stroke} from "../color";
import {Transform} from "../transform/transform";
import {nonNegative} from "../../utils";
import {Font} from "../text";

export class Text implements Shape {
  constructor(
    public text: string,
    public font: Font,
    public fill?: Color,
    public stroke?: Stroke
  ) {
  }

  draw(context: CanvasRenderingContext2D, transform: Transform): void {
    context.font = this.font.toString();
    if (this.fill) {
      context.fillStyle = this.fill.toString();
      context.fillText(
        this.text,
        transform.position.x,
        transform.position.y,
        context.measureText(this.text).width
      );
    }

    if (this.stroke) {
      context.strokeStyle = this.stroke.color.toString();
      context.lineWidth = nonNegative(this.stroke.width);

      context.strokeText(
        this.text,
        transform.position.x,
        transform.position.y,
        context.measureText(this.text).width
      );
    }
  }
}
