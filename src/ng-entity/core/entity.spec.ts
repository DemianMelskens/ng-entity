import {Scene} from './scene';
import {Entity} from './entity';
import {Component} from './interfaces';
import {TagComponent} from '../components/tag.component';

describe('Entity tests', () => {
  let scene: Scene;
  let entity: Entity;

  beforeEach(() => {
    scene = new Scene();
    entity = scene.createEntity('Test');
  });

  it('should add component to entity', () => {
    spyOn(scene.registry, 'emplace').and.returnValue(new TestComponent('Test'));
    entity.addComponent(TestComponent, 'Test');

    expect(scene.registry.emplace).toHaveBeenCalledWith(entity.id, TestComponent, 'Test');
  });

  it('should not add an component to an entity which it already has', () => {
    expect(() => entity.addComponent(TagComponent, 'Test2'))
      .toThrow(new Error('Entity already has component of type: TagComponent'));
  });

  it('should get component for entity', () => {
    expect(entity.getComponent(TagComponent).tag).toEqual('Test');
  });

  it('should throw error when getting a component for entity which it doesn\'t have', () => {
    expect(() => entity.getComponent(TestComponent))
      .toThrow(new Error('Entity does not have component of type: TestComponent'));
  });
});

class TestComponent implements Component {
  constructor(public value: string) {
  }
}
