import {Awakable, Updatable} from './interfaces';
import {Entity} from '../core';

export interface Component extends Updatable, Awakable {
  entity: Entity | null;
}
