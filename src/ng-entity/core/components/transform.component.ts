import {Vector3d} from '../../shared/domain/vector';
import {Component} from "../scene";
import {Transform} from "../../shared/domain/transform/transform";

export class TransformComponent implements Component {

  constructor(
    public transform: Transform = {
      position: Vector3d.zero(),
      rotation: Vector3d.zero(),
      scale: Vector3d.zero(),
    },
  ) {
  }
}
