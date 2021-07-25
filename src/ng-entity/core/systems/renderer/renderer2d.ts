import {System} from "../../scene/system";
import {Registry} from "../../registry";
import {ColorComponent, TransformComponent} from "../../components";
import {ShapeComponent} from "../../components/shape.component";
import {Rectangle} from "../../../shared/domain/shape/rectangle";
import {Transform} from "../../../shared/domain/transform/transform";
import {Circle} from "../../../shared/domain/shape/circle";
import {ShapeType} from "../../../shared/domain/shape/shape-type";
import {Color} from "../../../shared/domain/color";

export class Renderer2d implements System {
  readonly registry;
  private readonly context;

  constructor(registry: Registry, context: CanvasRenderingContext2D) {
    this.registry = registry;
    this.context = context;
  }

  onUpdate(deltaTime: number): void {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    const group = this.registry.group(TransformComponent, ShapeComponent, ColorComponent);

    for (const entity of group) {
      const [transform, shape, color] = group.get(entity, TransformComponent, ShapeComponent, ColorComponent);

      switch (ShapeType.fromShape(shape!.shape)) {
        case ShapeType.RECTANGLE:
          this.drawRectangle(transform!.transform, shape!.shape as Rectangle, color!.color);
          break;
        case ShapeType.CIRCLE:
          this.drawCircle(transform!.transform, shape!.shape as Circle, color!.color);
          break;
      }
    }
  }

  private drawRectangle(transform: Transform, shape: Rectangle, color: Color): void {
    this.setColor(color);
    this.context.fillRect(
      transform.position.x,
      transform.position.y,
      shape.width,
      shape.height
    );
  }

  private drawCircle(transform: Transform, shape: Circle, color: Color): void {
    this.setColor(color);
    this.context.beginPath();
    this.context.arc(
      transform.position.x,
      transform.position.y,
      shape.radius,
      0,
      Math.PI * 2,
      true
    );
    this.context.fill();
  }

  private setColor(color: Color) {
    this.context.fillStyle = color.toString('rgba');
  }
}
