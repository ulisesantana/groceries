import { describe, expect, it } from "vitest";
import { CategoryList } from "../../../domain";
import { CategoryBuilder } from "../../../tests/builders";
import { PouchDatasource } from "../../data-sources/pouch-db.data-source";
import { CategoryRepositoryPouchDb } from "./category.repository.pouch-db";
import { PouchDBTestHelper } from "../../../tests/helpers";

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
});
