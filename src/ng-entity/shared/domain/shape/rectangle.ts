import {Shape} from "./shape";

export class Rectangle implements Shape {
  constructor(
    public width: number,
    public height: number
  ) {
  }
}
