import {Component} from "../core/component.model";
import {Entity} from "../core/entity.model";

export class TransformComponent implements Component {
  entity?: Entity;

  update(): void {
  }

}
