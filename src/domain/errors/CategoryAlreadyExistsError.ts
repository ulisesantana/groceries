import { ErrorCodes } from "./ErrorCodes";
import { Category } from "../entities";

export class CategoryAlreadyExistsError extends Error {
  static code = ErrorCodes.CategoryAlreadyExists;

  constructor(category: Category) {
    super(`Category with id ${category.id.value} and name ${category.name}.`);
    this.name = "CategoryAlreadyExistsError";
  }
}
