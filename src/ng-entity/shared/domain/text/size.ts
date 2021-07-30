import {Globals} from "./globals";

export type Size =
  'xx-small' |
  'x-small' |
  'small' |
  'medium' |
  'large' |
  'x-large' |
  'xx-large' |
  'xxx-large' |
  'smaller' |
  'larger' |
  `${number}px` |
  `${number}em` |
  `${number}%` |
  Globals;
