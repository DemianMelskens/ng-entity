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

  public emplace<T extends Component>(clazz: Class<T>, entity: number, ...args: any[]): T {
    const component = new clazz(args);
    this._components.push({entity, component});
    return component;
  }

  public get<T extends Component>(clazz: Class<T>, entity: number): T | undefined {
    const entry = this._components.find(entry => (entry.entity === entity && entry.component instanceof clazz));
    return entry ? entry.component as T : undefined;
  }

  public remove<T extends Component>(clazz: Class<T>, entity: number): void {
    const index = this._components.findIndex(entry => (entry.entity === entity && entry.component instanceof clazz));
    this._components.splice(index, 1);
  }

  // returns group with all entities that contain wanted components and all components
  public group(...clazzes: Class<any>[]): Group[] {
    new Group(this._components.filter(entry => clazzes.some(clazz => entry.component instanceof clazz)))
    return;
  }

  public has<T extends Component>(clazz: Class<T>, entity: number): boolean {
    const entry = this.get(clazz, entity);
    return entry !== undefined;
  }

  public static create(): Registry {
    return new Registry()
  }
}


