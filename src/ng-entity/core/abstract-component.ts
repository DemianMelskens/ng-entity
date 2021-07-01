import {Component} from "./interfaces/component";
import {AbstractEntity} from "./abstract-entity";

export abstract class AbstractComponent implements Component {
  entity: AbstractEntity | null = null;

  start(): void {
    throw new Error('Not implemented yet!');
  }

  update(deltaTime: number): void {
    throw new Error('Not implemented yet!');
  }
}
