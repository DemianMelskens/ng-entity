import {Color} from "../core/classes";
import {Component} from "../core/interfaces";

export class ColorComponent implements Component {

  constructor(public color: Color) {
  }
}
