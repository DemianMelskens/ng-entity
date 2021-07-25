export class Canvas {

  constructor(private element: HTMLCanvasElement) {
    this.calculateDPI();
    window.addEventListener('resize', this.calculateDPI.bind(this));
  }

  public getContext(contextId: '2d' | 'bitmaprenderer' | 'webgl' | 'webgl2')
    : CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext | ImageBitmapRenderingContext {
    return this.element.getContext(contextId)!;
  }

  private calculateDPI(): void {
    const dpi = window.devicePixelRatio;
    this.element.width = Number(getComputedStyle(this.element).width.slice(0, -2)) * dpi;
    this.element.height = Number(getComputedStyle(this.element).height.slice(0, -2)) * dpi;
  }
}
