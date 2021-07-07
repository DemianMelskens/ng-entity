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

  it('should get component for entity', () => {
    const result = view.get(entity, TestComponent);
    expect(result!.value).toEqual('test');
  });

  it('should check if it has a component for entity', () => {
    expect(view.has(entity, TestComponent)).toEqual(true);
  });

  it('should iterate through all entities', () => {
    const iterator = view[Symbol.iterator]();
    expect(iterator.next()).toEqual({value: 0, done: false});
    expect(iterator.next()).toEqual({value: undefined, done: true});
  });
});

class TestComponent implements Component {
  constructor(public value: string) {
  }
}
