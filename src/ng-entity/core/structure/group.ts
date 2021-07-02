import {Component, ComponentEntry} from "../interfaces";
import {Class} from "../types";
import {ASSERT} from "../utils";

export class Group {
  private readonly _entities: number[];
  private readonly _components: ComponentEntry[];

  public constructor(entities: number[], component: ComponentEntry[]) {
    this._entities = entities;
    this._components = component;
  }

  public get entities(): number[] {
    return this._entities;
  }

  public get<T extends Component>(entity: number, clazz: Class<T>): T {
    ASSERT(this.has(entity, clazz), `Group does not contains component of type: ${clazz.name} for entity: ${entity}`);

    return this._components.find(
      component => (component.entity === entity && component instanceof clazz)
    )!.component as T;
  }

  public has<T extends Component>(entity: number, clazz: Class<T>): boolean {
    const entry = this.get(entity, clazz);
    return entry !== undefined;
  }
}
