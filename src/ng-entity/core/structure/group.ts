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

  public get<T, R>(entity: number, clazz1: Class<T>, clazz2?: Class<R>): [T, R] {
    const clazzes: Class<any>[] = [clazz1, clazz2].filter(clazz => clazz !== undefined) as Class<any>[];

    const components: Component[] = clazzes.map(clazz => {
      const pool = this._components.get(clazz);
      if (pool) {
        const component = pool.get(entity);
        if (component) {
          return component;
        }
        throw new Error(`Component of type: ${clazz} not found for entity: ${entity}!`);
      }
      throw new Error(`Component of type: ${clazz} not found for entity: ${entity}!`);
    })


    return [components[0] as T, components[1] as R];
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
