import {Entity} from "../interfaces";
import {Class} from "../types";

export class EntityManager {
  private static instance: EntityManager;
  private readonly _entities: Entity[];

  private constructor() {
    this._entities = [];
  }

  public createEntity<T extends Entity>(clazz: Class<T>): T {
    const entity = new clazz();
    entity.id = Math.max(...this._entities.map(entity => entity.id), -1) + 1;
    this._entities.push(entity);
    // eslint-disable-next-line no-console
    console.log(entity);
    return entity;
  }

  public static getInstance(): EntityManager {
    if (!EntityManager.instance) {
      EntityManager.instance = new EntityManager();
    }

    return EntityManager.instance;
  }
}
