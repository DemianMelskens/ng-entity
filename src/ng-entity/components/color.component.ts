import {Color} from "../core/domain";
import {Component} from "../core/interfaces";

export class ColorComponent implements Component {

  constructor(public color: Color) {
  }
}
