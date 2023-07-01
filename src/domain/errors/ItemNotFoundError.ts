import { BaseError } from "./BaseError";
import { ErrorCodes } from "./ErrorCodes";
import { Id } from "../entities";

export class ItemNotFoundError extends BaseError {
  readonly code = ErrorCodes.ItemNotFound;

  constructor(id: Id) {
    super(`Item with id ${id.value} not found.`);
    this.name = "ItemNotFoundError";
  }
}
