import { BaseError } from "./BaseError";
import { ErrorCodes } from "./ErrorCodes";
import { Id } from "../entities";

export class CategoryNotFoundError extends BaseError {
  readonly code = ErrorCodes.CategoryNotFound;

  constructor(id: Id) {
    super(`Category with id ${id.value} not found.`);
    this.name = "CategoryNotFoundError";
  }
}
