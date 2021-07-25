import {System} from "../../scene/system";
import {Registry} from "../../registry";
import {ShapeComponent, TransformComponent} from "../../components";

export class Renderer2d implements System {
  readonly registry;
  private readonly context;

  constructor(registry: Registry, context: CanvasRenderingContext2D) {
    this.registry = registry;
    this.context = context;
  }

  onUpdate(deltaTime: number): void {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    const group = this.registry.group(TransformComponent, ShapeComponent);

    for (const entity of group) {
      const [transform, shape] = group.get(entity, TransformComponent, ShapeComponent);
      shape!.shape.draw(this.context, transform!.transform, shape!.fill, shape!.stroke);
    }
  }
}
