import {AbstractComponent} from '../core';
import {Vector2d} from "../core/domain/vector2d.model";

export class DimensionComponent extends AbstractComponent {
  dimension: Vector2d;

  constructor(dimension: Vector2d = Vector2d.zero()) {
    super();
    this.dimension = dimension;
  }

  start(): void {
  }

  update(deltaTime: number): void {
  }
}
