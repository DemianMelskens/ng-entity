import {Component} from '../interfaces';
import {Class} from '../types';
import {Group} from "./group";
import {GUI} from "../utils/gui";
import {ComponentPool} from "./component-pool";
import {distinct} from "../utils/array.utils";

export class Registry {
  private readonly _entities: number[];
  private readonly _components: Map<Class<any>, ComponentPool>;

  private constructor() {
    this._entities = [];
    this._components = new Map<Class<any>, ComponentPool>();
  }

  public entities(): number[] {
    return this._entities;
  }

  public create(): number {
    const entity = GUI.getInstance().next();
    this._entities.push(entity);
    return entity;
  }

  public emplace<T extends Component>(entity: number, clazz: Class<T>, ...args: any[]): T {
    const component = new clazz(args);
    let pool = this._components.get(clazz);

    if (pool) {
      pool.set(entity, component);
    } else {
      pool = new ComponentPool();
      this._components.set(clazz, pool.set(entity, component));
    }

    return component;
  }

  public get<T extends Component>(entity: number, clazz: Class<T>): T | undefined {
    const pool = this._components.get(clazz);

    if (pool) {
      return pool.get(entity) as T;
    }

    return undefined;
  }

  public remove<T extends Component>(entity: number, clazz: Class<T>): void {
    const pool = this._components.get(clazz);
    if (pool) {
      pool.delete(entity);
      if (pool.isEmpty()) {
        this._components.delete(clazz);
      }
    }
  }

  public has<T extends Component>(clazz: Class<T>, entity: number): boolean {
    const component = this.get(entity, clazz);
    return component !== undefined;
  }

  public group(...clazzes: Class<any>[]): Group {
    const components = Array.from(this._components.entries()).filter(([key]) => clazzes.includes(key));
    const entities: number[] = components.flatMap(([_, value]) => value.entities()).filter(distinct);

    return new Group(entities, new Map(components));
  }

  public static create(): Registry {
    return new Registry()
  }
}


