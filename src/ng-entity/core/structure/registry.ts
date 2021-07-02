import {Component, Entity} from '../interfaces';
import {Class} from '../types';

interface ComponentEntry {
  entity: Entity;
  component: Component;
}

export class Registry {
  private readonly _components: ComponentEntry[];

  private constructor() {
    this._components = [];
  }

  public emplace<T extends Component>(clazz: Class<T>, entity: Entity, ...args: any[]): T {
    const component = new clazz(args);
    this._components.push({entity, component});
    return component;
  }

  public get<T extends Component>(clazz: Class<T>, entity: Entity): T | undefined {
    const entry = this._components.find(component => (component.entity.id === entity.id && component instanceof clazz));
    return entry ? entry.component as T : undefined;
  }

  public has<T extends Component>(clazz: Class<T>, entity: Entity): boolean {
    const entry = this.get(clazz, entity);
    return entry !== undefined;
  }
}
