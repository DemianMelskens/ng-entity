import {Class} from './types';
import {Component} from './interfaces';
import {Scene} from "./structure";
import {ASSERT} from "./utils";

/**
 * this class should not be extended
 * it is simple a shell of functions to add components easier
 */
export class Entity {
  public id: number;
  public scene: Scene;

  public constructor(id: number, scene: Scene) {
    this.id = id;
    this.scene = scene;
  }

  public addComponent<T extends Component>(clazz: Class<T>, ...args: any[]): T {
    ASSERT(this.hasComponent(clazz), `Entity already has component of type: ${clazz.name}`);
    return this.scene.registry.emplace(this.id, clazz, args) as T;
  }

  public getComponent<T extends Component>(clazz: Class<T>): T {
    ASSERT(this.hasComponent(clazz), `Entity does not have component of type: ${clazz.name}`);
    return this.scene.registry.get(this.id, clazz) as T;
  }

  public removeComponent<T extends Component>(clazz: Class<T>): void {
    return this.scene.registry.remove(this.id, clazz);
  }

  public hasComponent<T extends Component>(clazz: Class<T>): boolean {
    ASSERT(this.hasComponent(clazz), `Entity does not have component of type: ${clazz.name}`);
    return this.scene.registry.has(clazz, this.id);
  }
}
