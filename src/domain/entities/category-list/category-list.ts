import { Category } from "../category";
import { Id } from "../id";

export class CategoryList {
  private readonly _categories: Category[];
  constructor(categories: Category[]) {
    this._categories = [...categories].sort(CategoryList.sortByName);
  }

  private get categories(): Category[] {
    return [...this._categories];
  }

  private static sortByName<T extends { name: string }>(a: T, b: T) {
    return CategoryList.sortAsc(a.name, b.name);
  }

  private static sortAsc<T = number | string>(a: T, b: T) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  get values() {
    return this.categories;
  }

  has(category: Category): boolean {
    return this.categories.some(
      (c) => c.id.equals(category.id) || c.name === category.name
    );
  }

  findById(id: Id): Category | undefined {
    return this.categories.find((category) => id.equals(category.id));
  }
}
