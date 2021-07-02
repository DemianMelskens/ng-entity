import {Component, ComponentEntry} from "../interfaces";
import {Class} from "../types";

export class Group {
  private readonly _components: ComponentEntry[];

  public constructor(component: ComponentEntry[]) {
    this._components = component;
  }

  public get<T extends Component>(clazz: Class<T>, entity: number): T | undefined {
    const entry = this._components.find(component => (component.entity === entity && component instanceof clazz));
    return entry ? entry.component as T : undefined;
  }
}
