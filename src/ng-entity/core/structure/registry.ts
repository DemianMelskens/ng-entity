import {Component} from '../interfaces';
import {Class} from '../types';
import {Group} from "./group";
import {Optional} from "../utils";
import {ComponentPool} from "./component-pool";

export class Registry {
  private count = 0;
  private readonly _components: Map<Class<any>, ComponentPool>;

  private constructor() {
    this._components = new Map<Class<any>, ComponentPool>();
  }

  public create(): number {
    return this.count++;
  }

  public emplace<T extends Component>(entity: number, clazz: Class<T>, ...args: any[]): T {
    const component = new clazz(...args);
    const optional = Optional.of(this._components.get(clazz));

    optional.ifPresentOrElse(
      pool => pool.set(entity, component),
      () => {
        const pool = new ComponentPool();
        this._components.set(clazz, pool.set(entity, component));
      }
    );

    return component;
  }

  public get<T extends Component>(entity: number, clazz: Class<T>): T | undefined {
    const optional = Optional.of(this._components.get(clazz));
    return optional.map(pool => pool.get(entity) as T).orElse(undefined);
  }

  public remove<T extends Component>(entity: number, clazz: Class<T>): void {
    const optional = Optional.of(this._components.get(clazz));

    optional.ifPresent(pool => {
      pool.delete(entity);
      if (pool.isEmpty()) {
        this._components.delete(clazz);
      }
    });
  }

  public has<T extends Component>(entity: number, clazz: Class<T>): boolean {
    const optional = Optional.of(this.get(entity, clazz));
    return optional.isPresent();
  }

  public group(...clazzes: Class<any>[]): Group {
    const components = Array.from(this._components.entries()).filter(([key]) => clazzes.includes(key));
    return new Group(new Map(components));
  }

  public static create(): Registry {
    return new Registry()
  }
}


