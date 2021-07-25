import {Color} from "../color";
import {Transform} from "../transform/transform";

export interface Shape {
  draw(context: CanvasRenderingContext2D, transform: Transform, fill?: Color, stroke?: Color): void;
}
