import {AbstractEntity} from "../../ng-entity/core";
import {EntityManager} from "../../ng-entity/core/managers/entity.manager";
import {Panel} from "./panel.entity";
import {DimensionComponent} from "../../ng-entity/components/dimension.component";
import {Vector2d} from "../../ng-entity/core/domain/vector2d.model";
import {TransformComponent} from "../../ng-entity/components/transform.component";
import {Vector3d} from "../../ng-entity/core/domain";

export class Canvas extends AbstractEntity {
  private dimensions = new Vector2d(10, 10);
  private grid = new Vector2d(3, 3);
  private offset = 2;
  private _lastTimestamp = 0
  private _panels: Panel[] = []

  private init(): void {
    const size = this.getComponent(DimensionComponent);
    for (let y = 0; y < size.dimension.y; y++) {
      for (let x = 0; x < size.dimension.x; x++) {
        const panel = EntityManager.getInstance().createEntity(Panel);
        panel.addComponent(new TransformComponent(new Vector3d(
          (x * this.dimensions.x) + (x * this.offset),
          (y * this.dimensions.y) + (y * this.offset),
          0)
        ));
        panel.addComponent(new DimensionComponent(this.dimensions));
        this._panels.push(panel)
      }
    }
  }

  public start(): void {
    this.addComponent(new DimensionComponent(this.grid));
    this.init();
    super.start()

    for (const panel of this._panels) {
      panel.start()
    }

    window.requestAnimationFrame(() => {
      this._lastTimestamp = Date.now()
      this.update()
    })
  }

  public update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000
    super.update(deltaTime)

    for (const panel of this._panels) {
      panel.update(deltaTime)
    }

    this._lastTimestamp = Date.now()
    window.requestAnimationFrame(() => this.update())
  }
}
