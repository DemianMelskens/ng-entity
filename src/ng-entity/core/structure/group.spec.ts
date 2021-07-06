import {Group} from './group';
import {Component} from '../interfaces';
import {ComponentPool} from './component-pool';

describe('Group tests', () => {
  let entity: number;
  let group: Group;

  beforeEach(() => {
    entity = 0;
    group = new Group(new Map([[
      TestComponent, new ComponentPool(
        new Map([[
          entity, new TestComponent('test')
        ]])
      )
    ]]));
  });

  it('should get entities in group', () => {
    expect(group.entities()).toEqual([0]);
  });

  it('should get component for entity', () => {
    const result = group.get(entity, TestComponent);
    expect(result!.value).toEqual('test');
  });

  it('should check if it has a component for entity', () => {
    expect(group.has(entity, TestComponent)).toEqual(true);
  });
});

class TestComponent implements Component {
  constructor(public value: string) {
  }
}
