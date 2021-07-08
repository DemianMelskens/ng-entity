import {Scene} from './scene';
import {TagComponent} from '../components/tag.component';

describe('Scene tests', () => {
  let scene: Scene;

  beforeEach(() => {
    scene = new Scene();
  });

  it('should create an entity', () => {
    const entity = scene.createEntity('test');
    expect(entity.getComponent(TagComponent).tag).toEqual('test');
  });
});
