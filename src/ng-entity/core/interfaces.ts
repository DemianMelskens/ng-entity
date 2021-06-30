export interface Awakable {
  awake(): void;
}

export interface Updatable {
  update(deltaTime: number): void;
}
