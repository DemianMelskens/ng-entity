import {Component, ComponentEntry} from '../interfaces';
import {Class} from '../types';
import {Group} from "./group";

export class Registry {
  private readonly _entities: number[];
  private readonly _components: ComponentEntry[];

  private constructor() {
    this._entities = [];
    this._components = [];
  }

  public create(): number {
    //TODO: create global unique identifier system
    const entity = -1;
    this._entities.push(entity);
    return entity;
  }

  public emplace<T extends Component>(entity: number, clazz: Class<T>, ...args: any[]): T {
    const component = new clazz(args);
    this._components.push({entity, component});
    return component;
  }

  public get<T extends Component>(entity: number, clazz: Class<T>): T | undefined {
    const entry = this._components.find(entry => (entry.entity === entity && entry.component instanceof clazz));
    return entry ? entry.component as T : undefined;
  }

  public remove<T extends Component>(entity: number, clazz: Class<T>): void {
    const index = this._components.findIndex(entry => (entry.entity === entity && entry.component instanceof clazz));
    this._components.splice(index, 1);
  }

  public group(...clazzes: Class<any>[]): Group {
    const entities: number[] = [];
    const components: ComponentEntry[] = [];

    this._entities.forEach(
      entity => {
        const entityComponents = this._components.filter(
          entry => entry.entity === entity && clazzes.some(clazz => entry.component instanceof clazz)
        );

        if (components.length > 0) {
          entities.push(entity);
          components.push(...entityComponents);
        }
      }
    );

    return new Group(entities, components);
  }

  public has<T extends Component>(clazz: Class<T>, entity: number): boolean {
    const entry = this.get(entity, clazz);
    return entry !== undefined;
  }

  public static create(): Registry {
    return new Registry()
  }
}


