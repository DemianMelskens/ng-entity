import {Component} from "../core/interfaces";

export class TagComponent implements Component {

  constructor(
    public tag: string = ''
  ) {
  }
}
