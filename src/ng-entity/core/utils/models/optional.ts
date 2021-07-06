import {NonNullish} from '../../types';

export class Optional<T> {

  constructor(private _value: T | undefined) {
  }

  public static of<R>(value: R): Optional<R> {
    return new Optional(value);
  }

  public static empty(): Optional<undefined> {
    return new Optional(undefined);
  }

  public get(): T | undefined {
    return this._value;
  }

  public filter(predicate: (value: NonNullish<T>) => boolean): Optional<T | undefined> {
    if (this._value !== undefined && predicate(this._value as NonNullish<T>)) {
      return this;
    }
    return Optional.empty();
  }

  public ifPresent(consumer: (value: NonNullish<T>) => void): void {
    if (this._value !== undefined) {
      consumer(this._value as NonNullish<T>);
    }
  }

  public ifPresentOrElse(consumer: (value: NonNullish<T>) => void, fn: () => void): void {
    if (this._value !== undefined) {
      consumer(this._value as NonNullish<T>);
    } else {
      fn();
    }
  }

  public isPresent(): boolean {
    return this._value !== undefined;
  }

  public map<R>(fn: (value: NonNullish<T>) => R): Optional<R | undefined> {
    if (this._value !== undefined) {
      return new Optional(fn(this._value as NonNullish<T>));
    }
    return Optional.empty();
  }

  public orElse<R>(value: R): T | R {
    if (this._value === undefined) {
      return value;
    }
    return this._value;
  }

  public orElseGet<R>(supplier: () => R): T | R {
    if (this._value === undefined) {
      return supplier();
    }
    return this._value;
  }

  public orElseThrow(error: Error = new Error('value not present!')): T {
    if (this._value === undefined) {
      throw error;
    }
    return this._value;
  }
}
