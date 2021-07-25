import {Color} from "../color";
import {Transform} from "../transform/transform";

export interface Shape {
  fill?: Color;
  stroke?: Color;

  draw(context: CanvasRenderingContext2D, transform: Transform): void;
}
