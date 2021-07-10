export class Vector3d {

  constructor(
    public x: number,
    public y: number,
    public z: number
  ) {
  }

  public static zero(): Vector3d {
    return new Vector3d(0, 0, 0);
  }
}
