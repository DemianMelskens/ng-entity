import {ComponentPool} from './component-pool';
import {Component} from '../interfaces';

describe('ComponentPool tests', () => {
  let entity = 0;
  let pool: ComponentPool;

  beforeEach(() => {
    pool = new ComponentPool(
      new Map([[entity, new TestComponent('test')]])
    );
  });

  it('should get component for entity', () => {
    const result = pool.get(entity);
    expect((result as TestComponent).value).toEqual('test');
  });

  it('should set component for entity', () => {
    pool = new ComponentPool();
    const component = new TestComponent('test');

    pool.set(entity, component);

    const result = pool.get(entity);
    expect((result as TestComponent).value).toEqual('test');
  });

  it('should remove component for entity', () => {
    pool.delete(entity);
    const result = pool.get(entity);
    expect(result).toEqual(undefined);
  });

  it('should check if pool is empty', () => {
    expect(pool.isEmpty()).toEqual(false);
    pool = new ComponentPool();
    expect(pool.isEmpty()).toEqual(true);
  });

  it('should get list of entities in pool', () => {
    expect(pool.entities()).toContain(0);
  });
});

class TestComponent implements Component {
  constructor(public value: string) {
  }
}
