import { CategoryRepository } from "../../../application";
import { Category, CategoryList, Id } from "../../../domain";
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

  private static mapCategoryToDomain(document: PouchDBCategory): Category {
    return new Category({
      _id: document._id,
      _rev: document._rev,
      id: new Id(document.id),
      name: document.name,
      color: document.color,
      icon: document.icon,
    });
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
        CategoryRepositoryPouchDb.mapCategoryToDomain(doc as PouchDBCategory)
      )
    );
  }
}
