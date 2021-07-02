import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {EntityManager} from "../ng-entity/core/managers/entity.manager";
import {Canvas} from "./entities";
import {CanvasManager} from "../ng-entity/core/managers/canvas.manager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ECS';
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  constructor() {
  }

  ngAfterViewInit(): void {
    CanvasManager.getInstance().addLayer(this.canvas!.nativeElement);

    const entityManager = EntityManager.getInstance()
    const canvas = entityManager.createEntity(Canvas);
    canvas.start();

  }
}
