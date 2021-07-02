import {Component, Entity} from "./interfaces";

export abstract class AbstractComponent implements Component {
  private _entity: Entity | null = null;

  getEntity(): Entity {
    if (this._entity) {
      return this._entity;
    }
    throw new Error('Entity for component was not set!');
  }

  setEntity(entity: Entity | null): void {
    this._entity = entity;
  }

  abstract start(): void;

  abstract update(deltaTime: number): void;
}
