import {AbstractComponent} from '../core';
import {Vector3d} from '../core/domain';

export class TransformComponent extends AbstractComponent {
  position: Vector3d;
  rotation: Vector3d;
  scale: Vector3d;

  constructor(
    transform: Vector3d = Vector3d.zero(),
    rotation: Vector3d = Vector3d.zero(),
    scale: Vector3d = Vector3d.zero()
  ) {
    super();
    this.position = transform;
    this.rotation = rotation;
    this.scale = scale;
  }

  start(): void {
  }

  update(deltaTime: number): void {
  }
}
