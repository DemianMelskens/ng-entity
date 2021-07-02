import {Vector4d} from "./vectors/vector4d.model";
import {ColorType} from "../types";
import {Vector3d} from "./vectors/vector3d.model";

export class Color {
  private _vector4d: Vector4d;

  private constructor(vector4d: Vector4d) {
    if (!Color.IsValidChannel(vector4d.x)) {
      throw new Error('Provided incorrect value for Red channel')
    }

    if (!Color.IsValidChannel(vector4d.y)) {
      throw new Error('Provided incorrect value for Green channel')
    }

    if (!Color.IsValidChannel(vector4d.z)) {
      throw new Error('Provided incorrect value for Green channel')
    }

    if (vector4d.w !== undefined && !Color.IsValidChannel(vector4d.w, true)) {
      throw new Error('Provided incorrect value for Alpha channel')
    }

    this._vector4d = vector4d;
  }

  public toString(type: ColorType) {
    switch (type) {
      case "rgb":
        return `rgb(${this._vector4d.x}, ${this._vector4d.y}, ${this._vector4d.z})`;
      case "rgba":
        return `rgba(${this._vector4d.x}, ${this._vector4d.y}, ${this._vector4d.z}, ${this._vector4d.w})`;
    }
  }

  public static rgb(vector3d: Vector3d): Color {
    return new Color(new Vector4d(vector3d.x, vector3d.y, vector3d.z, 1));
  }

  public static rgba(vector4d: Vector4d): Color {
    return new Color(vector4d);
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

    return new Color(new Vector4d(r, g, b, a));
  }

  public static IsValidChannel(value: number, isAlpha = false): boolean {
    if (!isAlpha && value % 1 !== 0) {
      return false
    }

    const max = isAlpha ? 1 : 255
    return !(value < 0 || value > max)
  }
}
