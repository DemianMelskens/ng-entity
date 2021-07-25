import {Color} from './color';

export class Stroke {
  constructor(
    public color: Color,
    public width: number
  ) {
  }

  public static of(color: Color = Color.hex('#000000'), width: number = 0): Stroke {
    return new Stroke(color, width);
  }
}
