import {Vector3d, Vector4d} from "../vector";

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

    if (vector4d.w && !Color.IsValidChannel(vector4d.w, true)) {
      throw new Error('Provided incorrect value for Alpha channel')
    }

    this._vector4d = vector4d;
  }

  public toString() {
    return `rgba(${this._vector4d.x}, ${this._vector4d.y}, ${this._vector4d.z}, ${this._vector4d.w})`;
  }

  public static rgb(vector3d: Vector3d): Color {
    return new Color(new Vector4d(vector3d.x, vector3d.y, vector3d.z, 1));
  }

  public static rgba(vector4d: Vector4d): Color {
    return new Color(vector4d);
  }

  public static hex(str: string, alpha?: number): Color {
    const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(str);
    const vector = values ? new Vector4d(
      parseInt(values[1], 16),
      parseInt(values[2], 16),
      parseInt(values[3], 16),
      alpha ?? 1
    ) : null;

    if (vector) {
      return new Color(vector);
    }
    throw new Error('Invalid string');
  }

  public static IsValidChannel(value: number, isAlpha = false): boolean {
    if (!isAlpha && value % 1 !== 0) {
      return false
    }

    const max = isAlpha ? 1 : 255
    return !(value < 0 || value > max)
  }
}
