import {Entity} from "./entity";
import {Awakable, Updatable} from './interfaces';

export interface Component extends Updatable, Awakable {
  entity: Entity | null;
}
