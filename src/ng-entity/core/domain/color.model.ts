import {ColorType} from "../types";

export class Color {
  public readonly type: ColorType;
  public readonly r: number;
  public readonly g: number;
  public readonly b: number;
  public readonly a?: number;

  private constructor(type: ColorType, r: number, g: number, b: number, a?: number) {
    if (!Color.IsValidChannel(r)) {
      throw new Error('Provided incorrect value for Red channel')
    }

    if (!Color.IsValidChannel(g)) {
      throw new Error('Provided incorrect value for Green channel')
    }

    if (!Color.IsValidChannel(b)) {
      throw new Error('Provided incorrect value for Green channel')
    }

    if (a !== undefined && !Color.IsValidChannel(a, true)) {
      throw new Error('Provided incorrect value for Alpha channel')
    }

    this.type = type;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public toString() {
    switch (this.type) {
      case "rgb":
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
      case "rgba":
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
  }

  public static rgb(r: number, g: number, b: number): Color {
    return new Color('rgb', r, g, b);
  }

  public static rgba(r: number, g: number, b: number, a: number): Color {
    return new Color('rgba', r, g, b, a);
  }

  public static hex(str: string): Color {
    const arr = str
      .replace(new RegExp(/\(|\)|[A-Za-z]/g), '')
      .split(',')

    const
      r = Number(arr[0]),
      g = Number(arr[1]),
      b = Number(arr[2]),
      a = Number(arr[3])

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      throw new Error('Invalid string')
    }

    return new Color("rgba", r, g, b, a)
  }

  public static IsValidChannel(value: number, isAlpha = false): boolean {
    if (!isAlpha && value % 1 !== 0) {
      return false
    }

    const max = isAlpha ? 1 : 255
    return !(value < 0 || value > max)
  }
}
