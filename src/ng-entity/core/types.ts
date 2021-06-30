export type Type<T> = { new(...args: unknown[]): T };

export type RenderContext =
  CanvasRenderingContext2D
  | ImageBitmapRenderingContext
  | WebGLRenderingContext
  | WebGL2RenderingContext
  | RenderingContext;
