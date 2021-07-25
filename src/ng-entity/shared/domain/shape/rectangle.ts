import {Shape} from "./shape";
import {Transform} from "../transform/transform";
import {Color} from "../color";

export class Rectangle implements Shape {
  constructor(
    public width: number,
    public height: number
  ) {
  }

  draw(transform: Transform, color: Color): void {
  }
}
