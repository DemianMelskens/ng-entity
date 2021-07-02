import {Layer} from "../types";

export class CanvasManager {
  private static instance: CanvasManager;
  layers: Layer[] = [];

  private deactivateLayers(): void {
    this.layers.forEach(layer => layer.active = false);
  }

  public addLayer(canvas: HTMLCanvasElement): void {
    this.deactivateLayers();
    this.layers.push({active: true, canvas});
  }

  public removeLayer(index: number): void {
    this.layers.splice(index, 1);
  }

  public activateLayer(index: number): void {
    this.deactivateLayers();
    if (index in this.layers) {
      this.layers[index].active = true;
    }
  }

  public getActiveContext(): CanvasRenderingContext2D {
    const activeLayer = this.layers.find(layer => layer.active)!;

    if (activeLayer) {
      return activeLayer.canvas.getContext('2d')!;
    }

    throw new Error('No Active Layer Found!');
  }

  public static getInstance(): CanvasManager {
    if (!CanvasManager.instance) {
      CanvasManager.instance = new CanvasManager();
    }

    return CanvasManager.instance;
  }
}
