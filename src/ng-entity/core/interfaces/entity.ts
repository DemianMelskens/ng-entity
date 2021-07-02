import {Updatable} from "./updatable";
import {Startable} from "./startable";

export interface Entity extends Updatable, Startable {
  id: number | string;
}
