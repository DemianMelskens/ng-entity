export class Vector4d {

  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number
  ) {
  }

  public static zero(): Vector4d {
    return new Vector4d(0, 0, 0, 0);
  }
}
