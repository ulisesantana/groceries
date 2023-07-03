import { CategoryRepository } from "../../../application";
import { Category, CategoryList, Id } from "../../../domain";
import { CategoryNotFoundError } from "../../../domain/errors/CategoryNotFoundError";
import { CategoryNotSavedError } from "../../../domain/errors/CategoryNotSavedError";
import {
  PouchDatasource,
  PouchDBDocument,
} from "../../data-sources/pouch-db.data-source";

export type PouchDBCategory = PouchDBDocument<Category> & {
  _conflicts?: Array<string>;
  id: string;
};

export class CategoryRepositoryPouchDb implements CategoryRepository {
  constructor(private readonly pouch: PouchDatasource) {}

  private static mapToDomain(document: PouchDBCategory): Category {
    return new Category({
      _id: document._id,
      _rev: document._rev,
      id: new Id(document.id),
      name: document.name,
      color: document.color,
      icon: document.icon,
    });
  }

  async findById(id: Id): Promise<Category> {
    try {
      const document = await this.pouch.db.get<PouchDBCategory>(id.value);
      return CategoryRepositoryPouchDb.mapToDomain(document);
    } catch (error) {
      console.error(`Error getting category: ${error}`);
      throw new CategoryNotFoundError(id);
    }
  }

  async findAll(): Promise<CategoryList> {
    const documents = await this.pouch.db.allDocs<PouchDBCategory>({
      include_docs: true,
      conflicts: true,
    });
    if (documents.total_rows === 0) {
      return new CategoryList([]);
    }
    // @ts-ignore
    const conflicts = documents.rows.filter((doc) => doc._conflicts);
    console.log("[CONFLICTS]", conflicts);
    const rawCategories = documents.rows.filter(
      //@ts-ignore
      ({ doc }) => doc.type === PouchDatasource.DocumentTypes.Category
    );
    return new CategoryList(
      rawCategories.map(({ doc }) =>
        CategoryRepositoryPouchDb.mapToDomain(doc as PouchDBCategory)
      )
    );
  }

  async save(category: Category): Promise<Category> {
    try {
      const response = await this.pouch.db.put({
        ...category,
        id: category.id.value,
        type: PouchDatasource.DocumentTypes.Category,
      });
      if (!response.ok) {
        throw new CategoryNotSavedError(category);
      }
      return this.findById(category.id);
    } catch (error) {
      // @ts-ignore
      if (error.name === "conflict") {
        console.debug(
          `Retrying save for category ${category.name} (${category.id}).`
        );
        return this.save(category);
      } else {
        throw error;
      }
    }
  }
}
