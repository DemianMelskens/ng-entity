import {Startable, Updatable} from './index';
import {AbstractEntity} from "../abstract-entity";

/***
 * this interface should not be used to create own components
 * use the AbstractComponent class instead
 */
export interface Component extends Updatable, Startable {
  entity: AbstractEntity | null;
}
