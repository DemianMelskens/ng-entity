import {AbstractComponent} from '../core';
import {Vector3d} from '../core/domain';

export class Transform extends AbstractComponent {
  transform: Vector3d;

  constructor(transform: Vector3d = Vector3d.zero()) {
    super();
    this.transform = transform;
  }
}
