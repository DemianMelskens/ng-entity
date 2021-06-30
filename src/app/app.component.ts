import {Component} from '@angular/core';
import {Canvas} from './entities/canvas.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECS';
  canvas = new Canvas('canvas');

  constructor() {

  }
}
