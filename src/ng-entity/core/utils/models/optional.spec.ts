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
    const expected = new Expected();
    const result_1 = Optional.of(10);
    const result_2 = Optional.empty();

    spyOn(expected, 'check').and.callThrough();

    result_1.ifPresent(expected.check);
    expect(expected.check).toHaveBeenCalledTimes(1);

    result_2.ifPresent(expected.check);
    expect(expected.check).toHaveBeenCalledTimes(1);
  });

  it('should do function if value is present or else execute backup', () => {
    const expected = new Expected();
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

  it('should map if value is present', () => {
    const optional_1 = Optional.of(10);
    const optional_2 = Optional.empty();

    const result_1 = optional_1.map(value => value + 5);
    const result_2 = optional_2.map(value => value + 5);

    expect(result_1.isPresent()).toEqual(true);
    expect(result_1.orElseThrow()).toEqual(15);

    expect(result_2.isPresent()).toEqual(false);
    expect(result_2.orElse(20)).toEqual(20);
  });

  it('should should return other value if value is not present', () => {
    const optional_1 = Optional.of(10);
    const optional_2 = Optional.empty();

    expect(optional_1.orElse(20)).toEqual(10);
    expect(optional_2.orElse(20)).toEqual(20);
  });

  it('should execute function if value is not present', () => {
    const optional_1 = Optional.of(10);
    const optional_2 = Optional.empty();

    expect(optional_1.orElseGet(() => 20)).toEqual(10);
    expect(optional_2.orElseGet(() => 20)).toEqual(20);
  });

  it('should throw error if value is not present', () => {
    const optional_1 = Optional.of(10);
    const optional_2 = Optional.empty();

    expect(optional_1.orElseThrow()).toEqual(10);
    expect(() => optional_1.orElseThrow()).not.toThrow(new Error('value not present!'));
    expect(() => optional_2.orElseThrow()).toThrow(new Error('value not present!'));
  });

  it('should throw custom error if value is not present', () => {
    const optional_1 = Optional.of(10);
    const optional_2 = Optional.empty();
    const error = new Error('custom error')

    expect(optional_1.orElseThrow(error)).toEqual(10);
    expect(() => optional_1.orElseThrow(error)).not.toThrow(error);
    expect(() => optional_2.orElseThrow(error)).toThrow(error);
  });
});

class Expected {
  public check(value: any): void {
  }

  public fallback(): void {
  }
}
