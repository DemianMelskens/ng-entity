import {Shape} from "./shape";
import {Rectangle} from "./rectangle";
import {Circle} from "./circle";

export enum ShapeType {
  RECTANGLE,
  CIRCLE,
  NONE
}

export namespace ShapeType {
  export function fromShape(shape: Shape): ShapeType {
    if (shape instanceof Rectangle) {
      return ShapeType.RECTANGLE;
    } else if (shape instanceof Circle) {
      return ShapeType.CIRCLE;
    }
    return ShapeType.NONE;
  }
}
