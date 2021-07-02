import {AbstractComponent} from "../core";
import {CanvasManager} from "../core/managers/canvas.manager";
import {DimensionComponent} from "./dimension.component";
import {TransformComponent} from "./transform.component";
import {ColorComponent} from "./color.component";

export class RenderComponent extends AbstractComponent {

  public start(): void {
    this.clear()
  }

  public update(deltaTime: number): void {
    this.clear()
    this.render()
  }

  private render(): void {
    const size = this.getEntity().getComponent(DimensionComponent);
    const transform = this.getEntity().getComponent(TransformComponent);
    const color = this.getEntity().getComponent(ColorComponent);

    CanvasManager.getInstance().getActiveContext().fillStyle = color.color.toString()
    CanvasManager.getInstance().getActiveContext().fillRect(
      transform!.position.x,
      transform!.position.y,
      size!.dimension.x,
      size!.dimension.y
    )
  }

  private clear(): void {
    const size = this.getEntity().getComponent(DimensionComponent);
    const transform = this.getEntity().getComponent(TransformComponent);

    CanvasManager.getInstance().getActiveContext().clearRect(
      transform!.position.x,
      transform!.position.y,
      size!.dimension.x,
      size!.dimension.y
    );
  }
}
