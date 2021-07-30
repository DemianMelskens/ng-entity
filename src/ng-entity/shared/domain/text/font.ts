import {Variant} from "./variant";
import {Style} from "./style";
import {Weight} from "./weight";
import {Stretch} from "./stretch";
import {Size} from "./size";
import {LineHeight} from "./line-height";
import {Family} from "./family";

export class Font {
  constructor(
    public style: Style = 'unset',
    public variant: Variant = 'none',
    public weight: Weight = 'unset',
    public stretch: Stretch = 'unset',
    public size: Size = 'unset',
    public lineHeight: LineHeight = 'unset',
    public family: Family = "unset",
  ) {
  }

  public toString() {
    return this.size;
  }

  public static fromSize(size: Size): Font {
    return new Font(
      undefined,
      undefined,
      undefined,
      undefined,
      size
    );
  }
}
