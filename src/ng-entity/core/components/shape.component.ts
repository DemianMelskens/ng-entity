import {Component} from "../scene";
import {Shape} from "../../shared/domain/shape";
import {Color} from '../../shared/domain/color';

export class ShapeComponent implements Component {
  constructor(
    public shape: Shape,
    public fill?: Color,
    public stroke?: Color
  ) {
  }
}
