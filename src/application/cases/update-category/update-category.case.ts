import { Category, CategoryNotFoundError } from "../../../domain";
import { CategoryRepository } from "../../repositories";
import { UseCase } from "../use-case";

type Input = Category;
type Output = Promise<Category>;

export class UpdateCategoryCase implements UseCase<Input, Output> {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async exec(category: Input): Output {
    const categories = await this.categoryRepository.findAll();
    if (!categories.has(category)) {
      throw new CategoryNotFoundError(category.id);
    }
    return this.categoryRepository.save(category);
  }
}
