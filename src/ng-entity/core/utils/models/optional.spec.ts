import {Optional} from './optional';

describe('Optional tests', () => {
  beforeEach(() => {

  });

  it('should create optional of value', () => {
    const result = Optional.of(10);
    expect(result.isPresent()).toEqual(true);
    expect(result.orElseThrow()).toEqual(10);
  });

  it('should create optional empty', () => {
    const result = Optional.empty();
    expect(result.isPresent()).toEqual(false);
    expect(result.orElse(20)).toEqual(20);
  });

  it('should filter the optional value', () => {
    const optional = Optional.of(10);

    const result_1 = optional.filter(value => value > 5);
    const result_2 = optional.filter(value => value < 5);

    expect(result_1.isPresent()).toEqual(true);
    expect(result_1.orElseThrow()).toEqual(10);

    expect(result_2.isPresent()).toEqual(false);
    expect(result_2.orElse(20)).toEqual(20);
  });

  it('should do function if value is present', () => {
    const expected = new Expected(10);
    const result_1 = Optional.of(10);
    const result_2 = Optional.empty();

    spyOn(expected, 'check').and.callThrough();

    result_1.ifPresent(expected.check);
    expect(expected.check).toHaveBeenCalledTimes(1);

    result_2.ifPresent(expected.check);
    expect(expected.check).toHaveBeenCalledTimes(1);
  });

  it('should do function if value is present or else execute backup', () => {
    const expected = new Expected(10);
    const result_1 = Optional.of(10);
    const result_2 = Optional.empty();

    spyOn(expected, 'check').and.callThrough();
    spyOn(expected, 'fallback').and.callThrough();

    result_1.ifPresentOrElse(expected.check, expected.fallback);
    expect(expected.check).toHaveBeenCalledTimes(1);
    expect(expected.fallback).toHaveBeenCalledTimes(0);

    result_2.ifPresentOrElse(expected.check, expected.fallback);
    expect(expected.check).toHaveBeenCalledTimes(1);
    expect(expected.fallback).toHaveBeenCalledTimes(1);
  });
});

class Expected {

  constructor(private expected: any) {
  }

  public check(value: any): void {
    expect(value).toEqual(this.expected);
  }

  public fallback(): void {
  }
}
