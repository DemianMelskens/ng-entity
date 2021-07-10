import {Component} from "../scene";
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
      ],
      [
        Test3Component, new ComponentPool(
        new Map([[
          entity, new Test3Component('test3')
        ]])
      )
      ],
      [
        Test4Component, new ComponentPool(
        new Map([[
          entity, new Test4Component('test4')
        ]])
      )
      ],
      [
        Test5Component, new ComponentPool(
        new Map([[
          entity, new Test5Component('test5')
        ]])
      )
      ]
    ]));
  });

  it('should get a component for entity', () => {
    const [result1] = group.get(entity, TestComponent);

    doCheck(result1, 'test');
  });

  it('should get a pair of components for entity', () => {
    const [result1, result2] = group.get(entity, TestComponent, Test2Component);

    doCheck(result1, 'test');
    doCheck(result2, 'test2');
  });

  it('should get a triplet of components for entity', () => {
    const [result1, result2, result3] = group.get(entity, TestComponent, Test2Component, Test3Component);

    doCheck(result1, 'test');
    doCheck(result2, 'test2');
    doCheck(result3, 'test3');
  });

  it('should get a quad of components for entity', () => {
    const [result1, result2, result3, result4] = group.get(entity, TestComponent, Test2Component, Test3Component, Test4Component);

    doCheck(result1, 'test');
    doCheck(result2, 'test2');
    doCheck(result3, 'test3');
    doCheck(result4, 'test4');
  });

  it('should get a quintuple of components for entity', () => {
    const [result1, result2, result3, result4, result5] = group.get(entity, TestComponent, Test2Component, Test3Component, Test4Component, Test5Component);

    doCheck(result1, 'test');
    doCheck(result2, 'test2');
    doCheck(result3, 'test3');
    doCheck(result4, 'test4');
    doCheck(result5, 'test5');
  });

  it('should return undefined if component is not found for entity', () => {
    const [result1] = group.get(entity, Test6Component);

    expect(result1).toBeUndefined();
  });

  it('should check if it has a component for entity', () => {
    expect(group.has(entity, TestComponent)).toEqual(true);
  });

  it('should check if it has multiple components for entity', () => {
    expect(group.has(entity, TestComponent, Test2Component)).toEqual(true);
  });

  it('should check if it has not all components for entity', () => {
    expect(group.has(entity, TestComponent, Test6Component)).toEqual(false);
  });

  it('should iterate through all entities', () => {
    const iterator = group[Symbol.iterator]();
    expect(iterator.next()).toEqual({value: 0, done: false});
    expect(iterator.next()).toEqual({value: undefined, done: true});
  });
});

function doCheck(component: ITestComponent | undefined, value: any): void {
  expect(component).not.toBeUndefined();
  expect(component!.value).toEqual(value);
}

interface ITestComponent extends Component {
  value: string;
}

class TestComponent implements ITestComponent {
  constructor(public value: string) {
  }
}

class Test2Component implements ITestComponent {
  constructor(public value: string) {
  }
}

class Test3Component implements ITestComponent {
  constructor(public value: string) {
  }
}

class Test4Component implements ITestComponent {
  constructor(public value: string) {
  }
}

class Test5Component implements ITestComponent {
  constructor(public value: string) {
  }
}

class Test6Component implements ITestComponent {
  constructor(public value: string) {
  }
}
