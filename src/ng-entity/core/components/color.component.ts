import {Component} from "../scene";
import {Color} from "../../shared/domain/color";

export class ColorComponent implements Component {

  constructor(public color: Color) {
  }
}
