import {Component} from "./component";
import {Awakable, Updatable} from './interfaces';
import {Type} from './types';

export abstract class Entity implements Updatable, Awakable {
  private readonly _components: Component[]

  public name: string;

  protected constructor(name: string) {
    this.name = name;
    this._components = [];
  }

  public awake(): void {
    this._components.forEach(comp => comp.awake());
  }

  public update(deltaTime: number) {
    this._components.forEach(comp => comp.update(deltaTime));
  }

  public addComponent<T extends Component>(component: T): void {
    this._components.push(component)
    component.entity = this;
  }

  public getComponent<T extends Component>(type: Type<T>): T {
    const component = this._components.find(comp => comp instanceof type);

    if (component) {
      return component as T;
    }

    throw new Error(`Component ${type.name} not found on Entity ${this.name}`)
  }

  public removeComponent<T extends Component>(type: Type<T>): void {
    const index = this._components.findIndex(comp => comp instanceof type);
    const component = this._components[index];

    if (index && component) {
      component.entity = null;
      this._components.splice(index, 1);
    }
  }

  public hasComponent<T extends Component>(type: Type<T>): boolean {
    return this._components.findIndex(comp => comp instanceof type) >= 0;
  }
}
