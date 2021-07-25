import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ColorComponent, TransformComponent} from "../ng-entity/core/components";
import {Scene} from "../ng-entity/core/scene";
import {Color} from "../ng-entity/shared/domain/color";
import {Renderer2d} from "../ng-entity/core/systems/renderer/renderer2d";
import {ShapeComponent} from "../ng-entity/core/components/shape.component";
import {Rectangle} from "../ng-entity/shared/domain/shape/rectangle";
import {Circle} from "../ng-entity/shared/domain/shape/circle";
import {Canvas} from "../ng-entity/shared/domain/canvas";
import {UserInput} from "../ng-entity/core/systems/input/UserInput";
import {InputComponent} from "../ng-entity/core/components/input.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private _lastTimestamp: number = Date.now();
  title = 'ECS';
  scene: Scene = Scene.build();
  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;

  constructor() {
  }

  ngAfterViewInit(): void {
    const canvas = new Canvas(this.canvasElement!.nativeElement);
    this.scene.addSystem(Renderer2d, canvas.getContext('2d'));
    this.scene.addSystem(UserInput);

    const player1 = this.scene.createEntity('player_1');
    player1.addComponent(ColorComponent, Color.hex('#00ffff'));
    player1.addComponent(ShapeComponent, new Rectangle(100, 100));
    player1.getComponent(TransformComponent).transform.position = {x: 200, y: 200, z: 0};
    player1.addComponent(InputComponent);

    const player2 = this.scene.createEntity('player_2');
    player2.addComponent(ColorComponent, Color.hex('#ffff00'));
    player2.addComponent(ShapeComponent, new Circle(50));
    player2.getComponent(TransformComponent).transform.position = {x: 200, y: 200, z: 0};
    player2.addComponent(InputComponent);

    const player3 = this.scene.createEntity('player_3');
    player3.addComponent(ColorComponent, Color.hex('#ff0000'));
    player3.addComponent(ShapeComponent, new Circle(25));
    player3.getComponent(TransformComponent).transform.position = {x: 400, y: 200, z: 0};
    player3.addComponent(InputComponent);

    const player4 = this.scene.createEntity('player_4');
    player4.addComponent(ColorComponent, Color.hex('#6a00ff'));
    player4.addComponent(ShapeComponent, new Rectangle(200, 200));
    player4.getComponent(TransformComponent).transform.position = {x: 600, y: 200, z: 0};
    player4.addComponent(InputComponent);

    // this.scene.onUpdate(0);
    this.loop();
  }

  private loop(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000
    this.scene.onUpdate(deltaTime);

    window.requestAnimationFrame(() => {
      // set initial timestamp
      this._lastTimestamp = Date.now()

      // start update loop
      this.loop()
    })
  }
}
