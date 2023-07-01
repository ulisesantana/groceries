import { Category, CategoryList } from "../../domain";

export interface CategoryRepository {
  findAll(): Promise<CategoryList>;
  save(category: Category): Promise<Category>;
}
