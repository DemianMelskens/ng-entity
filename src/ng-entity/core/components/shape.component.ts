import {Component} from "../scene";
import {Shape} from "../../shared/domain/shape";

export class ShapeComponent implements Component {
  constructor(
    public shape: Shape,
  ) {
  }
}
