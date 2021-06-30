import {Component} from "../core/component";
import {Vector3d} from '../domain/vector3d.model';
import {Entity} from '../core/entity';

export class TransformComponent implements Component {
  entity: Entity | null;
  transform: Vector3d;

  constructor() {
    this.entity = null;
    this.transform = Vector3d.zero();
  }

  update(deltaTime: number): void {
  }

  awake(): void {
  }
}
