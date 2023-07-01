import { UseCase } from "../use-case";
import { CategoryList } from "../../../domain";
import { CategoryRepository } from "../../repositories";

type Input = void;
type Output = Promise<CategoryList>;

export class GetCategoriesCase implements UseCase<Input, Output> {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  exec(): Output {
    return this.categoryRepository.findAll();
  }
}
