import { UseCase } from "../use-case";
import { Category, CategoryAlreadyExistsError } from "../../../domain";
import { CategoryRepository } from "../../repositories";

type Input = Category;
type Output = Promise<Category>;

export class CreateCategoryCase implements UseCase<Input, Output> {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async exec(category: Input): Output {
    const categories = await this.categoryRepository.findAll();
    if (categories.has(category)) {
      throw new CategoryAlreadyExistsError(category);
    }
    return this.categoryRepository.save(category);
  }
}
