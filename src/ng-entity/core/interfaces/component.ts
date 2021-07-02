import {Entity, Startable, Updatable} from './index';

/***
 * this interface should not be used to create own components
 * use the AbstractComponent class instead
 */
export interface Component extends Updatable, Startable {
  getEntity(): Entity;

  setEntity(entity: Entity | null): void;
}
