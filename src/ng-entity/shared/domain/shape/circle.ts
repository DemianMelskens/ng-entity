import {Shape} from "./shape";
import {Transform} from "../transform/transform";
import {Color} from "../color";

export class Circle implements Shape {
  constructor(
    public radius: number,
  ) {
  }

  draw(transform: Transform, color: Color): void {
  }
}
