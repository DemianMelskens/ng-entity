import {Component} from "../interfaces";
import {Class} from "../types";
import {ComponentPool} from "./component-pool";
import {distinct} from "../utils";

export class Group {

  public constructor(
    private readonly _components: Map<Class<any>, ComponentPool>
  ) {
  }

  public entities(): number[] {
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
}
