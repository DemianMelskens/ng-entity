import {Component} from "../scene";

export class ComponentPool {

  constructor(
    private _components: Map<number, Component> = new Map<number, Component>()
  ) {
  }

  entities(): number[] {
    return Array.from(this._components.keys());
  }

  get(entity: number): Component | undefined {
    return this._components.get(entity);
  }

  emplace(entity: number, component: Component): ComponentPool {
    this._components.set(entity, component);
    return this;
  }

  remove(entity: number): boolean {
    return this._components.delete(entity);
  }

  isEmpty(): boolean {
    return this._components.size <= 0;
  }
}

