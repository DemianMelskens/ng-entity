import {Scene} from './scene';
import {TagComponent, TransformComponent} from '../components';
import {Registry} from "../registry";

describe('Scene tests', () => {
  let scene: Scene;
  let registry: Registry;

  beforeEach(() => {
    registry = Registry.build();
    scene = new Scene(registry);
  });

  it('should create an entity without name', () => {
    spyOn(registry, "create").and.returnValue(1);
    spyOn(registry, "emplace");

    const entity = scene.createEntity();

    expect(entity.id).toEqual(1);
    expect(registry.create).toHaveBeenCalled();
    expect(registry.emplace).toHaveBeenCalledWith(1, TransformComponent);
    expect(registry.emplace).toHaveBeenCalledWith(1, TagComponent, 'Entity');
  });

  it('should create an entity with name', () => {
    spyOn(registry, "create").and.returnValue(1);
    spyOn(registry, "emplace");

    const entity = scene.createEntity('test');

    expect(registry.create).toHaveBeenCalled();
    expect(registry.emplace).toHaveBeenCalledWith(1, TransformComponent);
    expect(registry.emplace).toHaveBeenCalledWith(1, TagComponent, 'test');
  });
});
