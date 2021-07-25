import {Class} from "../../shared/types";
import {ComponentPool} from "./component-pool";
import {distinct} from "../../shared/utils";
import {Component} from "../scene";
import {Optional} from "../../shared/domain/optional";

export class Group implements Iterable<number> {

  public constructor(
    private readonly _components: Map<Class<any>, ComponentPool>
  ) {
  }

  private entities(): number[] {
    return Array.from(this._components.entries()).flatMap(([_, value]) => value.entities()).filter(distinct);
  }

  private getComponents(entity: number, ...classes: (Class<any> | undefined)[]): (Component | undefined)[] {
    return classes.map(clazz => {
      if (clazz !== undefined) {
        const optional = Optional.of(this._components.get(clazz));
        return optional.map(pool => pool.get(entity)).orElseThrow(new Error(`Entity: ${entity} does not have component of type: ${clazz.name}`));
      } else {
        return undefined;
      }
    })
  }

  public get<T, R, W, Q, P>(entity: number, clazz1: Class<T>, clazz2?: Class<R>, clazz3?: Class<W>, clazz4?: Class<Q>, clazz5?: Class<P>)
    : [T | undefined, R | undefined, W | undefined, Q | undefined, P | undefined] {
    const components = this.getComponents(entity, clazz1, clazz2, clazz3, clazz4, clazz5);
    return [components[0] as T, components[1] as R, components[2] as W, components[3] as Q, components[4] as P];
  }

  public has<T extends Component>(entity: number, ...classes: Class<any>[]): boolean {
    const components = this.getComponents(entity, ...classes);
    return components.every(component => component !== undefined);
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
