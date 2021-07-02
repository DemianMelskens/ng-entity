import {Class} from './types';
import {Component, Entity} from './interfaces';

export abstract class AbstractEntity implements Entity {
  public id: number = -1;
  private readonly _components: Component[];

  public constructor() {
    this._components = [];
  }

  public start(): void {
    this._components.forEach(comp => comp.start());
  }

  public update(deltaTime: number) {
    this._components.forEach(comp => comp.update(deltaTime));
  }

  public addComponent<T extends Component>(component: T): void {
    this._components.push(component)
    component.setEntity(this);
  }

  public getComponent<T extends Component>(clazz: Class<T>): T {
    const component = this._components.find(comp => comp instanceof clazz);

    if (component) {
      return component as T;
    }

    throw new Error(`No component for type: ${clazz.name}`);
  }

  public removeComponent<T extends Component>(clazz: Class<T>): void {
    const index = this._components.findIndex(comp => comp instanceof clazz);
    const component = this._components[index];

    if (index && component) {
      component.setEntity(null);
      this._components.splice(index, 1);
    }
  }

  public hasComponent<T extends Component>(clazz: Class<T>): boolean {
    return this._components.findIndex(comp => comp instanceof clazz) >= 0;
  }
}
