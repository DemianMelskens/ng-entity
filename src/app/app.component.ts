import {Component} from '@angular/core';
import {Scene} from '../ng-entity/core/structure';
import {TagComponent} from "../ng-entity/components/tag.component";
import {TransformComponent} from "../ng-entity/components/transform.component";
import {ColorComponent} from "../ng-entity/components/color.component";
import {Color} from "../ng-entity/core/domain/color.model";

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
    player1.addComponent(ColorComponent, Color.hex('#00ffff'));
    // eslint-disable-next-line no-console
    console.log(player1);

    const player2 = scene.createEntity('player_2');
    player2.addComponent(ColorComponent, Color.hex('#ffff00'));
    // eslint-disable-next-line no-console
    console.log(player2);

    const group = scene.registry.group(TransformComponent, TagComponent, ColorComponent);

    for (const entity of group) {
      if (group.has(entity, TransformComponent, TagComponent, ColorComponent)) {
        const [transform, tag] = group.get(entity, TransformComponent, TagComponent);
        // eslint-disable-next-line no-console
        console.log(transform, tag);

        const [transform1, tag1, color1] = group.get(entity, TransformComponent, TagComponent, ColorComponent);
        // eslint-disable-next-line no-console
        console.log(transform1, tag1, color1);
      }
    }
  }
}
