export class Vector2d {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static zero(): Vector2d {
    return new Vector2d(0, 0);
  }
}
