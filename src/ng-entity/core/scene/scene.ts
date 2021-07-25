import {Entity} from "./entity";
import {Registry} from "../registry";
import {TagComponent, TransformComponent} from "../components";
import {Updatable} from "../interfaces";
import {System} from "./system";
import {Component} from "./component";
import {Class} from "../../shared/types";

export class Scene implements Updatable {
  readonly registry: Registry;
  readonly systems: System[];

  constructor(registry: Registry) {
    this.registry = registry;
    this.systems = [];
  }

  public createEntity(name: string = ''): Entity {
    const entity: Entity = new Entity(this.registry.create(), this);
    entity.addComponent(TransformComponent);
    entity.addComponent(TagComponent, name.length > 0 ? name : 'Entity');
    return entity;
  }

  public addSystem<T extends System>(clazz: Class<T>, ...args: any[]): T {
    const system = new clazz(this.registry, ...args);
    this.systems.push(system);
    return system as T;
  }

  public onUpdate(deltaTime: number): void {
    for (const system of this.systems) {
      system.onUpdate(deltaTime);
    }
  }

  public static build(): Scene {
    return new Scene(Registry.build());
  }
}
