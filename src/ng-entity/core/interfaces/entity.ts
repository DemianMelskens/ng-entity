import {Component} from "./component";
import {Class} from "../types";
import {Updatable} from "./updatable";
import {Startable} from "./startable";

export interface Entity extends Updatable, Startable {
  id: number;

  addComponent<T extends Component>(component: T): void;

  getComponent<T extends Component>(clazz: Class<T>): T;

  removeComponent<T extends Component>(clazz: Class<T>): void;

  hasComponent<T extends Component>(clazz: Class<T>): boolean;
}
