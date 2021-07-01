import {Startable, Updatable} from './interfaces';
import {Class} from './types';
import {Component} from './interfaces/component';

export abstract class AbstractEntity implements Updatable, Startable {
  private readonly _components: Component[]

  public id: number | string;

  protected constructor(name: number | string) {
    this.id = name;
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
    component.entity = this;
  }

  public getComponent<T extends Component>(clazz: Class<T>): T | null {
    const component = this._components.find(comp => comp instanceof clazz);
    return component as T ?? null;
  }

  public removeComponent<T extends Component>(clazz: Class<T>): void {
    const index = this._components.findIndex(comp => comp instanceof clazz);
    const component = this._components[index];

    if (index && component) {
      component.entity = null;
      this._components.splice(index, 1);
    }
  }

  public hasComponent<T extends Component>(clazz: Class<T>): boolean {
    return this._components.findIndex(comp => comp instanceof clazz) >= 0;
  }
}
