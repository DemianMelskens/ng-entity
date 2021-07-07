import {Component} from '../interfaces';
import {ComponentPool} from './component-pool';
import {Group} from './group';

describe('Group tests', () => {
  let entity: number;
  let group: Group;

  beforeEach(() => {
    entity = 0;
    group = new Group(new Map([
      [
        TestComponent, new ComponentPool(
        new Map([[
          entity, new TestComponent('test')
        ]])
      )
      ],
      [
        Test2Component, new ComponentPool(
        new Map([[
          entity, new Test2Component('test2')
        ]])
      )
      ]
    ]));
  });

  it('should get component for entity', () => {
    const [result1, result2] = group.get(entity, TestComponent, Test2Component);

    expect(result1.value).toEqual('test');
    expect(result2.value).toEqual('test2');
  });

  it('should check if it has a component for entity', () => {
    expect(group.has(entity, TestComponent)).toEqual(true);
  });

  it('should check if it has multiple components for entity', () => {
    expect(group.has(entity, TestComponent, Test2Component)).toEqual(true);
  });

  it('should iterate through all entities', () => {
    const iterator = group[Symbol.iterator]();
    expect(iterator.next()).toEqual({value: 0, done: false});
    expect(iterator.next()).toEqual({value: undefined, done: true});
  });
});

class TestComponent implements Component {
  constructor(public value: string) {
  }
}

class Test2Component implements Component {
  constructor(public value: string) {
  }
}
