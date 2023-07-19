import { BaseError } from "./BaseError";
import { ErrorCodes } from "./ErrorCodes";
import { Category } from "../entities";

export class CategoryAlreadyExistsError extends BaseError {
  readonly code = ErrorCodes.CategoryAlreadyExists;

  constructor(category: Category) {
    super(
      `Category with id ${category.id.value} and name ${category.name} already exists.`
    );
    this.name = "CategoryAlreadyExistsError";
  }
}
