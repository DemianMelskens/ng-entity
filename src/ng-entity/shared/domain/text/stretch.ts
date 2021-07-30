import {Globals} from "./globals";

export type Stretch =
  'ultra-condensed' |
  'extra-condensed' |
  'condensed' |
  'semi-condensed' |
  'normal' |
  'semi-expanded' |
  'expanded' |
  'extra-expanded' |
  'ultra-expanded' |
  `${number}%` |
  Globals;
