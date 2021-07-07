import {Class} from "../types";
import {ComponentPool} from "./component-pool";
import {distinct} from "../utils";
import {Component} from "../interfaces";

export class View implements Iterable<number> {

  public constructor(
    private readonly _components: Map<Class<any>, ComponentPool>
  ) {
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

  public has(entity: number, clazz: Class<any>): boolean {
    const entry = this.get(entity, clazz);
    return entry !== undefined;
  }

  [Symbol.iterator](): Iterator<number> {
    const entities = this.entities();
    let step = 0;

    return {
      next(): number | any | undefined {
        if (step < entities.length) {
          return {value: entities[step++], done: false};
        }
        return {value: undefined, done: true};
      }
    };
  }
}
