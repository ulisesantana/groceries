import { BaseError } from "./BaseError";
import { ErrorCodes } from "./ErrorCodes";
import { Category } from "../entities";

export class CategoryNotSavedError extends BaseError {
  readonly code = ErrorCodes.CategoryNotSaved;

  constructor(category: Category) {
    super(`Error saving category with id ${category.id.value}.`);
    this.name = "CategoryNotSavedError";
  }
}
