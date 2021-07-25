export class Input {
  private static _instance: Input;

  keys: { [index: string]: boolean; };

  private constructor() {
    this.keys = {};
    window.addEventListener("keydown", this.keyPressed.bind(this), false);
    window.addEventListener('keyup', this.keyReleased.bind(this), false);
  }

  private keyPressed(event: KeyboardEvent) {
    this.keys[event.key] = true;
  }

  private keyReleased(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

  isKeyPressed(key: string): boolean {
    return this.keys[key];
  }

  public static getInstance(): Input {
    if (this._instance) {
      return this._instance;
    }
    return new Input();
  }
}
