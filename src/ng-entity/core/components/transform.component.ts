import {Vector3d} from '../../shared/domain/vector';
import {Component} from "../scene";

export class TransformComponent implements Component {

  constructor(
    public position: Vector3d = Vector3d.zero(),
    public rotation: Vector3d = Vector3d.zero(),
    public scale: Vector3d = Vector3d.zero()
  ) {
  }
}
