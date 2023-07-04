import { describe, expect, it, vi } from "vitest";
import { CategoryBuilder } from "../../../tests/builders";
import { CategoryRepository } from "../../repositories";
import { UpdateCategoryCase } from "./update-category.case";
import { Category, CategoryList, CategoryNotFoundError } from "../../../domain";

describe("Update category use case should", () => {
  it("update a category successfully", async () => {
    const category = CategoryBuilder.init().build();
    const update = new Category({ ...category, name: "Irrelevant name" });
    const categoriesRepository = {
      findAll: vi.fn(async () => new CategoryList([category])),
      save: vi.fn(async (category) => category),
    } as unknown as CategoryRepository;

    const updatedCategory = await new UpdateCategoryCase(
      categoriesRepository
    ).exec(update);

    expect(updatedCategory).toEqual(update);
    expect(categoriesRepository.save).toHaveBeenCalledWith(update);
  });

  it("throw CategoryNotFoundError if category does not exist", async () => {
    const category = CategoryBuilder.init().build();
    const categoriesRepository = {
      findAll: vi.fn(async () => new CategoryList([])),
      save: vi.fn(async () => {}),
    } as unknown as CategoryRepository;

    await expect(
      new UpdateCategoryCase(categoriesRepository).exec(category)
    ).rejects.toThrow(new CategoryNotFoundError(category.id));
    expect(categoriesRepository.save).not.toHaveBeenCalled();
  });
});
