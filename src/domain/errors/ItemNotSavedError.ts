import { BaseError } from "./BaseError";
import { ErrorCodes } from "./ErrorCodes";
import { Item } from "../entities";

export class ItemNotSavedError extends BaseError {
  readonly code = ErrorCodes.ItemNotSaved;

  constructor(item: Item) {
    super(`Error saving item with id ${item.id.value}.`);
    this.name = "ItemNotSavedError";
  }
}
