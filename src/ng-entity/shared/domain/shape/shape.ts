import {Color} from "../color";
import {Transform} from "../transform/transform";

export interface Shape {
  draw(transform: Transform, color: Color): void;
}
