import {Entity} from "../entity";
import {Registry} from "./registry";
import {TransformComponent} from "../../components/transform.component";
import {TagComponent} from "../../components/tag.component";
import {ColorComponent} from "../../components/color.component";
import {Updatable} from "../interfaces";

export class Scene implements Updatable {
  registry: Registry;

  constructor() {
    this.registry = Registry.create();
  }

  public createEntity(name: string = ''): Entity {
    const entity: Entity = new Entity(this.registry.create(), this);
    entity.addComponent(TransformComponent);
    const tag = entity.addComponent(TagComponent);
    tag.tag = name.length > 0 ? name : 'Entity';

    return entity;
  }

  public onUpdate(deltaTime: number): void {
    const group = this.registry.group(TransformComponent, ColorComponent);

    for (const entity of group) {
      const transform = group.get(entity, TransformComponent);
    }
  }
}
