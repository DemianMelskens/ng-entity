import {System} from "../../scene/system";
import {Registry} from "../../registry";
import {InputComponent, ShapeComponent, SpeedComponent, TransformComponent} from "../../components";
import {Input} from "../../../shared/domain/input/input";
import {Circle, Rectangle} from "../../../shared/domain/shape";

export class UserInput implements System {
  readonly registry: Registry;
  readonly input: Input;

  constructor(registry: Registry) {
    this.registry = registry;
    this.input = Input.getInstance();
  }

  onUpdate(deltaTime: number): void {
    const group = this.registry.group(TransformComponent, ShapeComponent, SpeedComponent, InputComponent);

    for (const entity of group) {
      const [transform, shape, speed] = group.get(entity, TransformComponent, ShapeComponent, SpeedComponent, InputComponent);

      if (this.input.isKeyPressed('w')) {
        transform!.transform.position.y -= speed!.speed!.y;
      }

      if (this.input.isKeyPressed('s')) {
        transform!.transform.position.y += speed!.speed!.y;
      }

      if (this.input.isKeyPressed('a')) {
        transform!.transform.position.x -= speed!.speed!.x;
      }

      if (this.input.isKeyPressed('d')) {
        transform!.transform.position.x += speed!.speed!.x;
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
