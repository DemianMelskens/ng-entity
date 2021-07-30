import {Globals} from "./globals";

type GenericFamily =
  'serif' |
  'sans-serif' |
  'monospace' |
  'cursive' |
  'fantasy' |
  'system-ui' |
  'ui-serif' |
  'ui-sans-serif' |
  'ui-monospace' |
  'ui-rounded' |
  'emoji' |
  'math' |
  'fangsong';

export type Family =
  GenericFamily |
  `${string}, ${GenericFamily}` |
  Globals;
