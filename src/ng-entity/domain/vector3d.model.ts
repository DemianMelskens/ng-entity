export class Vector3d {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public static zero(): Vector3d {
    return new Vector3d(0, 0, 0);
  }
}
