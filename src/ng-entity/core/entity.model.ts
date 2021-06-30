import {Component} from "./component.model";
import {Type} from "./types/type.type";

export abstract class Entity {
  public name: string;

  private readonly _components: Component[]

  protected constructor(name: string) {
    this.name = name;
    this._components = [];
  }

  public update() {
    this._components.forEach(component => component.update());
  }

  public addComponent<T extends Component>(component: T): void {
    this._components.push(component)
    component.entity = this;
  }

  public getComponent<T extends Component>(type: Type<T>): T {
    const component = this._components.find(component => component instanceof type);

    if (component) {
      return component as T;
    }

    throw new Error(`Component ${type.name} not found on Entity ${this.name}`)
  }

  public removeComponent<T extends Component>(type: Type<T>): void {
    const index = this._components.findIndex(component => component instanceof type);
    const component = this._components[index];

    if (index && component) {
      component.entity = undefined;
      this._components.splice(index, 1);
    }
  }

  public hasComponent<T extends Component>(type: Type<T>): boolean {
    return this._components.findIndex(component => component instanceof type) >= 0;
  }
}
