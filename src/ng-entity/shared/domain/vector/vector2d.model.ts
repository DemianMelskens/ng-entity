export class Vector2d {

  constructor(
    public x: number,
    public y: number
  ) {
  }

  public static zero(): Vector2d {
    return new Vector2d(0, 0);
  }
}
