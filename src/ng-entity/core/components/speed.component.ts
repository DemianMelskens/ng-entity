import {Component} from '../scene';
import {Vector3d} from '../../shared/domain/vector';

export class SpeedComponent implements Component {

  constructor(public speed: Vector3d = Vector3d.zero()) {
  }
}
