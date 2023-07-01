import { PouchDatasource } from "../../infrastructure/data-sources/pouch-db.data-source";
import { CategoryBuilder, ItemBuilder } from "../builders";
import PouchDb from "pouchdb";
import PouchDbMemoryAdapter from "pouchdb-adapter-memory";

PouchDb.plugin(PouchDbMemoryAdapter);

export class PouchDBTestHelper {
  constructor(private pouch: PouchDatasource) {}

  static createPouchDatasource(): PouchDatasource {
    return PouchDatasource.createPouchDatasource(PouchDb, {
      dbName: "groceries-test",
      options: { adapter: "memory" },
    });
  }

  async createCategory(category = CategoryBuilder.random()): Promise<void> {
    await this.pouch.db.put({
      ...category,
      id: category.id.value,
      type: PouchDatasource.DocumentTypes.Category,
    });
  }

  async createItem(item = ItemBuilder.random()): Promise<void> {
    await this.createCategory(item.category);
    await this.pouch.db.put({
      ...item,
      id: item.id.value,
      category: item.category.id.value,
      type: PouchDatasource.DocumentTypes.Item,
    });
  }

  async reset(): Promise<void> {
    return this.pouch.db.destroy();
  }
}
