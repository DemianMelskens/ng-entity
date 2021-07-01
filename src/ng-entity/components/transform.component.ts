import {Component, Entity} from '../core';
import {Vector3d} from '../domain/vector3d.model';

export class Transform implements Component {
  entity: Entity | null;
  transform: Vector3d;

  constructor(transform: Vector3d = Vector3d.zero()) {
    this.entity = null;
    this.transform = transform;
  }

  update(deltaTime: number): void {
  }

  awake(): void {
  }
}
