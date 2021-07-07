import {Registry} from "./registry";
import {Component} from "./interfaces";

describe('Registry tests', () => {
  let registry: Registry;
  let entity: number;

  beforeEach(() => {
    registry = Registry.create();
    entity = registry.create();
  });

  it('should create entity', () => {
    let result = registry.create();
    expect(result).toEqual(1);

    result = registry.create();
    expect(result).toEqual(2);
  });

  it('should emplace component for entity', () => {
    const result = registry.emplace(entity, TestComponent, 'test');

    expect(result.value).toEqual('test');
    expect(registry.has(entity, TestComponent)).toBeTruthy();
  });

  it('should emplace components for multiple entities', () => {
    const entity_2 = registry.create();

    const component_1 = registry.emplace(entity, TestComponent, 'test_1');
    const component_2 = registry.emplace(entity_2, TestComponent, 'test_2');
    expect(component_1).toBeTruthy();
    expect(component_2).toBeTruthy();

    const result_1 = registry.get(entity, TestComponent);
    const result_2 = registry.get(entity_2, TestComponent);

    expect(result_1).toBeTruthy();
    expect(result_1!.value).toEqual('test_1');

    expect(result_2).toBeTruthy();
    expect(result_2!.value).toEqual('test_2');
  });

  it('should get component for entity', () => {
    registry.emplace(entity, TestComponent, 'test');
    const result = registry.get(entity, TestComponent);

    expect(result).toBeTruthy();
    expect(result!.value).toEqual('test');
  });

  it('should get component for entity which it doesn\'t have', () => {
    const result = registry.get(entity, TestComponent);

    expect(result).toBeFalsy();
    expect(result).toEqual(undefined);
  });

  it('should remove component for entity', () => {
    registry.emplace(entity, TestComponent, 'test');

    let component = registry.get(entity, TestComponent);
    expect(component).toBeTruthy();
    expect(component!.value).toEqual('test');

    registry.remove(entity, TestComponent);

    const result = registry.get(entity, TestComponent);
    expect(result).toBeFalsy();
    expect(result).toEqual(undefined);
  });

  it('should check if an entity has a component', () => {
    let result = registry.has(entity, TestComponent);
    expect(result).toEqual(false);

    registry.emplace(entity, TestComponent, 'test');

    result = registry.has(entity, TestComponent);
    expect(result).toEqual(true);
  });

  it('should create a Group of the components requested', () => {
    registry.emplace(entity, TestComponent, 'test');

    const result = registry.group(TestComponent);

    expect(result.has(entity, TestComponent)).toEqual(true);
  });

  it('should create a registry', () => {
    const result = Registry.create();
    expect(result).toBeTruthy();
  });
});

class TestComponent implements Component {
  constructor(public value: string) {
  }
}
