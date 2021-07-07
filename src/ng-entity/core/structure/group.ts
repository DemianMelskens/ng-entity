import {Component} from "../interfaces";
import {Class} from "../types";
import {ComponentPool} from "./component-pool";
import {distinct} from "../utils";

export class Group implements Iterable<number> {

  public constructor(
    private readonly _components: Map<Class<any>, ComponentPool>
  ) {
  }

  private entities(): number[] {
    return Array.from(this._components.entries()).flatMap(([_, value]) => value.entities()).filter(distinct);
  }

  public get(entity: number, ...clazzes: Class<any>[]): [...Component[]] | undefined {
    const components: Component[] = [];

    clazzes.forEach(clazz => {
      const pool = this._components.get(clazz);
      if (pool) {
        components.push(pool.get(entity) as typeof clazz);
      }
    })

    return components.length > 0 ? [...components] : undefined;
  }

  public has<T extends Component>(entity: number, ...clazzes: Class<any>[]): boolean {
    return clazzes.every(clazz => {
      const entry = this.get(entity, clazz);
      return entry !== undefined;
    });
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
