import {Updatable} from "../interfaces";
import {Registry} from "../registry";

export interface System extends Updatable {
  readonly registry: Registry;
}
