import {Component} from "../interfaces";
import {Class} from "../types";
import {ComponentPool} from "./component-pool";
import {distinct} from "../utils";

export class Group {
  private readonly _components: Map<Class<any>, ComponentPool>;

  public constructor(component: Map<Class<any>, ComponentPool>) {
    this._components = component;
  }

  public entities(): number[] {
    return Array.from(this._components.entries()).flatMap(([_, value]) => value.entities()).filter(distinct);
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
