import {Component} from '@angular/core';
import {Scene} from '../ng-entity/core/structure';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECS';

  constructor() {
    const scene = new Scene();

    const player1 = scene.createEntity('player_1');
    // eslint-disable-next-line no-console
    console.log(player1);

    const player2 = scene.createEntity('player_2');
    // eslint-disable-next-line no-console
    console.log(player2);

    // eslint-disable-next-line no-console
    console.log(scene.registry.components);
  }
}
