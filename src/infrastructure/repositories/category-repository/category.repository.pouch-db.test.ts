import { describe, expect, it, vi } from "vitest";
import { CategoryList } from "../../../domain";
import { CategoryNotSavedError } from "../../../domain/errors/CategoryNotSavedError";
import { CategoryBuilder } from "../../../tests/builders";
import { PouchDBTestHelper } from "../../../tests/helpers";
import { PouchDatasource } from "../../data-sources/pouch-db.data-source";
import { CategoryRepositoryPouchDb } from "./category.repository.pouch-db";

describe("Pouch DB implementation for category repository should", () => {
  let pouchDataSource: PouchDatasource;
  let helper: PouchDBTestHelper;

  beforeEach(() => {
    pouchDataSource = PouchDBTestHelper.createPouchDatasource();
    helper = new PouchDBTestHelper(pouchDataSource);
  });

  afterEach(async () => {
    await helper.reset();
  });

  describe("find all categories", () => {
    it("successfully", async () => {
      const expectedCategories = new CategoryList(
        Array.from({ length: 3 }).map(CategoryBuilder.random)
      );
      await Promise.all(
        expectedCategories.values.map((category) =>
          helper.createCategory(category)
        )
      );

      const categories = await new CategoryRepositoryPouchDb(
        pouchDataSource
      ).findAll();

      for (const category of expectedCategories.values) {
        expect(categories.has(category)).toBeTruthy();
      }
    });

    it("return and empty CategoryList if there are no categories", async () => {
      const categories = await new CategoryRepositoryPouchDb(
        pouchDataSource
      ).findAll();

      expect(categories.values).toHaveLength(0);
    });
  });

  it("save a category", async () => {
    const expectedCategory = CategoryBuilder.random();
    const categoryRepositoryPouchDB = new CategoryRepositoryPouchDb(
      pouchDataSource
    );

    const category = await categoryRepositoryPouchDB.save(expectedCategory);

    const savedCategory = await categoryRepositoryPouchDB.findById(
      expectedCategory.id
    );
    expect(category).toStrictEqual(savedCategory);
  });

  it("retry to save if there is conflict", async () => {
    const category = CategoryBuilder.random();
    await helper.createCategory(category);
    let saveHasBeenCalled = false;
    const categoryRepositoryPouchDB = new CategoryRepositoryPouchDb({
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
    categoryRepositoryPouchDB.findById = async () => category;
    const saveSpy = vi.spyOn(categoryRepositoryPouchDB, "save");

    await categoryRepositoryPouchDB.save(category);

    expect(saveSpy).toHaveBeenCalledTimes(2);
  });

  it("throw an CategoryNotSavedError if category can't be saved", async () => {
    const expectedCategory = CategoryBuilder.random();
    const categoryRepositoryPouchDB = new CategoryRepositoryPouchDb({
      db: { put: vi.fn(async () => ({ ok: false })) },
    } as unknown as PouchDatasource);

    await expect(
      categoryRepositoryPouchDB.save(expectedCategory)
    ).rejects.toThrow(new CategoryNotSavedError(expectedCategory));
  });
});
