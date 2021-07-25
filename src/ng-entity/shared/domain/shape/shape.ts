import {Color, Stroke} from "../color";
import {Transform} from "../transform/transform";

export interface Shape {
  fill?: Color;
  stroke?: Stroke;

  draw(context: CanvasRenderingContext2D, transform: Transform): void;
}
