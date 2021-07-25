import {System} from "../../scene/system";
import {Registry} from "../../registry";
import {TransformComponent} from "../../components";
import {InputComponent} from "../../components/input.component";
import {Input} from "../../../shared/domain/input/input";
import {ShapeComponent} from "../../components/shape.component";
import {Rectangle} from "../../../shared/domain/shape/rectangle";
import {Circle} from "../../../shared/domain/shape/circle";

export class UserInput implements System {
  readonly registry: Registry;
  readonly input: Input;

  constructor(registry: Registry) {
    this.registry = registry;
    this.input = Input.getInstance();
  }

  onUpdate(deltaTime: number): void {
    const group = this.registry.group(TransformComponent, ShapeComponent, InputComponent);

    for (const entity of group) {
      const [transform, shape] = group.get(entity, TransformComponent, ShapeComponent, InputComponent);

      if (this.input.isKeyPressed('w')) {
        transform!.transform.position.y--;
      }

      if (this.input.isKeyPressed('s')) {
        transform!.transform.position.y++;
      }

      if (this.input.isKeyPressed('a')) {
        transform!.transform.position.x--;
      }

      if (this.input.isKeyPressed('d')) {
        transform!.transform.position.x++;
      }

      if (this.input.isKeyPressed('=')) {
        if (shape!.shape instanceof Rectangle) {
          (shape!.shape as Rectangle).height++;
          (shape!.shape as Rectangle).width++;
        } else {
          (shape!.shape as Circle).radius++;
        }
      }

      if (this.input.isKeyPressed('-')) {
        if (shape!.shape instanceof Rectangle) {
          (shape!.shape as Rectangle).height--;
          (shape!.shape as Rectangle).width--;
        } else {
          (shape!.shape as Circle).radius--;
        }
      }
    }
  }

}
