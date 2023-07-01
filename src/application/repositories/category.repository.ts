import { Category, CategoryList, Id } from "../../domain";

export interface CategoryRepository {
  findById(id: Id): Promise<Category>;
  findAll(): Promise<CategoryList>;
  save(category: Category): Promise<Category>;
}
