import {Component} from "../interfaces";
import {Class} from "../types";
import {ComponentPool} from "./component-pool";

export class Group {
  private readonly _entities: number[];
  private readonly _components: Map<Class<any>, ComponentPool>;

  public constructor(entities: number[], component: Map<Class<any>, ComponentPool>) {
    this._entities = entities;
    this._components = component;
  }

  public get entities(): number[] {
    return this._entities;
  }

  public get<T extends Component>(entity: number, clazz: Class<T>): T | undefined {
    const pool = this._components.get(clazz);
    if (pool) {
      return pool.get(entity) as T;
    }
    return undefined;
  }

  public has<T extends Component>(entity: number, clazz: Class<T>): boolean {
    const entry = this.get(entity, clazz);
    return entry !== undefined;
  }
}
