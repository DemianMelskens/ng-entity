export class GUI {
  private static instance: GUI;
  public count = 1;

  public next(): number {
    return this.count++;
  }

  public static getInstance(): GUI {
    if (!GUI.instance) {
      GUI.instance = new GUI();
    }

    return GUI.instance;
  }
}
