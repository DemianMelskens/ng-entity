import {Entity} from '../../ng-entity/core/entity';

export class Canvas extends Entity {
  private _lastTimestamp: number;
  private readonly _entities: Entity[];

  constructor(name: string) {
    super(name);
    this._lastTimestamp = 0;
    this._entities = [];
  }

  public get entities() {
    return this._entities;
  }

  public addEntity(entity: Entity): void {
    this._entities.push(entity);
  }

  public awake() {
    super.awake();

    this._entities.forEach(entity => entity.awake());

    window.requestAnimationFrame(() => {
      this._lastTimestamp = Date.now()
      this.update()
    })
  }

  public update() {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000;

    super.update(deltaTime);

    this._entities.forEach(entity => entity.update(deltaTime));

    this._lastTimestamp = Date.now();

    window.requestAnimationFrame(() => this.update());
  }
}
