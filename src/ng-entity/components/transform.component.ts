import {Vector3d} from '../core/domain';
import {Component} from "../core/interfaces";

export class TransformComponent implements Component {

  constructor(
    public position: Vector3d = Vector3d.zero(),
    public rotation: Vector3d = Vector3d.zero(),
    public scale: Vector3d = Vector3d.zero()
  ) {
  }
}
