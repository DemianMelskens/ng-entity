import {Component} from '../interfaces';
import {ComponentPool} from './component-pool';
import {View} from "./view";

describe('View tests', () => {
  let entity: number;
  let view: View;

  beforeEach(() => {
    entity = 0;
    view = new View(new Map([[
      TestComponent, new ComponentPool(
        new Map([[
          entity, new TestComponent('test')
        ]])
      )
    ]]));
  });

  it('should get entities in group', () => {
    expect(view.entities()).toEqual([0]);
  });

  it('should get component for entity', () => {
    const result = view.get(entity, TestComponent);
    expect(result!.value).toEqual('test');
  });

  it('should check if it has a component for entity', () => {
    expect(view.has(entity, TestComponent)).toEqual(true);
  });
});

class TestComponent implements Component {
  constructor(public value: string) {
  }
}
