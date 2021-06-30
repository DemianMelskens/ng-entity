import {Component} from '../core/component';
import {Entity} from '../core/entity';
import {RenderContext} from '../core/types';

export class CanvasComponent<T extends RenderContext> implements Component {
  entity: Entity | null = null;
  context: T;

  constructor(context: T) {
    this.context = context;
  }

  awake(): void {
  }

  update(deltaTime: number): void {
  }

}
