import { describe, expect, it, vi } from "vitest";
import { Item, ItemList, ItemNotSavedError } from "../../../domain";
import { CategoryBuilder, ItemBuilder } from "../../../tests/builders";
import { PouchDatasource } from "../../data-sources/pouch-db.data-source";
import { ItemRepositoryPouchDB } from "./item.repository.pouch-db";
import { PouchDBTestHelper } from "../../../tests/helpers";
import { ItemNotFoundError } from "../../../domain";

describe("Pouch DB implementation for item repository should", () => {
  let pouchDataSource: PouchDatasource;
  let helper: PouchDBTestHelper;

  beforeEach(() => {
    pouchDataSource = PouchDBTestHelper.createPouchDatasource();
    helper = new PouchDBTestHelper(pouchDataSource);
  });

  afterEach(async () => {
    await helper.reset();
  });

  describe("find item by id", () => {
    it("successfully", async () => {
      const expectedItem = ItemBuilder.random();
      await helper.createItem(expectedItem);

      const item = await new ItemRepositoryPouchDB(pouchDataSource).findById(
        expectedItem.id
      );

      assertItemsAreEqual(item, expectedItem);
    });

    it("throw ItemNotFoundError if item is not found", async () => {
      const expectedItem = ItemBuilder.random();

      await expect(
        new ItemRepositoryPouchDB(pouchDataSource).findById(expectedItem.id)
      ).rejects.toThrow(new ItemNotFoundError(expectedItem.id));
    });
  });

  describe("find all items", () => {
    it("successfully", async () => {
      const expectedItems = new ItemList(Array.of(3).map(ItemBuilder.random));
      await Promise.all(
        expectedItems.values.map((item) => helper.createItem(item))
      );

      const items = await new ItemRepositoryPouchDB(pouchDataSource).findAll();

      for (const [index, item] of Object.entries(items.values)) {
        assertItemsAreEqual(item, expectedItems.values.at(+index)!);
      }
    });

    it("return and empty ItemList if there are no items", async () => {
      const items = await new ItemRepositoryPouchDB(pouchDataSource).findAll();

      expect(items.values).toHaveLength(0);
    });
  });

  it("save an item", async () => {
    const expectedItem = ItemBuilder.random();
    await helper.createCategory(expectedItem.category);
    const itemRepositoryPouchDB = new ItemRepositoryPouchDB(pouchDataSource);

    const item = await itemRepositoryPouchDB.save(expectedItem);

    const savedItem = await itemRepositoryPouchDB.findById(expectedItem.id);
    expect(item).toStrictEqual(savedItem);
  });

  it("retry to save if there is conflict", async () => {
    const item = ItemBuilder.random();
    await helper.createItem(item);
    let saveHasBeenCalled = false;
    const itemRepositoryPouchDB = new ItemRepositoryPouchDB({
      db: {
        put() {
          if (!saveHasBeenCalled) {
            saveHasBeenCalled = true;
            throw { name: "conflict" };
          }
          return { ok: true };
        },
      },
    } as unknown as PouchDatasource);
    itemRepositoryPouchDB.findById = async () => item;
    const saveSpy = vi.spyOn(itemRepositoryPouchDB, "save");

    await itemRepositoryPouchDB.save(item);

    expect(saveSpy).toHaveBeenCalledTimes(2);
  });

  it("throw an ItemNotSavedError if item can't be saved", async () => {
    const expectedItem = ItemBuilder.random();
    const itemRepositoryPouchDB = new ItemRepositoryPouchDB({
      db: { put: vi.fn(async () => ({ ok: false })) },
    } as unknown as PouchDatasource);

    await expect(itemRepositoryPouchDB.save(expectedItem)).rejects.toThrow(
      new ItemNotSavedError(expectedItem)
    );
  });
});

function assertItemsAreEqual(item: Item, expectedItem: Item) {
  expect(item).toStrictEqual(
    ItemBuilder.clone(expectedItem)
      .withRevision(item._rev)
      .withCategory(
        CategoryBuilder.clone(item.category)
          .withRevision(item.category._rev)
          .build()
      )
      .build()
  );
}
