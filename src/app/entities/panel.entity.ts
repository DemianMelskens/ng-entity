import {AbstractEntity} from "../../ng-entity/core";
import {Vector2d} from "../../ng-entity/core/domain/vector2d.model";
import {DimensionComponent} from "../../ng-entity/components/dimension.component";
import {RenderComponent} from "../../ng-entity/components/render.component";
import {ColorComponent} from "../../ng-entity/components/color.component";
import {Color} from "../../ng-entity/core/domain";

export class Panel extends AbstractEntity {

  public get size(): Vector2d {
    const size = this.getComponent(DimensionComponent);
    return size ? size.dimension : Vector2d.zero();
  }

  public start(): void {
    this.addComponent(new ColorComponent(Color.rgb(255, 0, 0)));
    this.addComponent(new RenderComponent());

    super.start();
  }
}
