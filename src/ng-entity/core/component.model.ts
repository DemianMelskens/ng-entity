import {Entity} from "./entity.model";

export interface Component {
  entity?: Entity;

  update(): void;
}
