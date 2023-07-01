import { CategoryList } from "../../domain";

export interface CategoryRepository {
  findAll(): Promise<CategoryList>;
}
