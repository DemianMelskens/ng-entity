import {AbstractComponent} from '../core';
import {Color} from "../core/domain";

export class ColorComponent extends AbstractComponent {
  color: Color;

  constructor(color: Color) {
    super();
    this.color = color;
  }

  start(): void {
  }

  update(deltaTime: number): void {
  }
}
