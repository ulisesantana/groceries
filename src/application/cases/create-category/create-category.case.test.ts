import { describe, expect, it, vi } from "vitest";
import { CategoryBuilder } from "../../../tests/builders";
import { CategoryRepository } from "../../repositories";
import { CreateCategoryCase } from "./create-category.case";
import { CategoryAlreadyExistsError, CategoryList } from "../../../domain";

describe("Create category use case should", () => {
  it("create a category successfully", async () => {
    const category = CategoryBuilder.init().build();
    const categoriesRepository = {
      findAll: vi.fn(async () => new CategoryList([])),
      save: vi.fn(async (category) => category),
    } as unknown as CategoryRepository;

    const createdCategory = await new CreateCategoryCase(
      categoriesRepository
    ).exec(category);

    expect(createdCategory).toEqual(category);
    expect(categoriesRepository.save).toHaveBeenCalledWith(category);
  });

  it("throw error if category already exists", async () => {
    const category = CategoryBuilder.init().build();
    const categoriesRepository = {
      findAll: vi.fn(async () => new CategoryList([category])),
      save: vi.fn(async () => {}),
    } as unknown as CategoryRepository;

    await expect(
      new CreateCategoryCase(categoriesRepository).exec(category)
    ).rejects.toThrow(new CategoryAlreadyExistsError(category));
    expect(categoriesRepository.save).not.toHaveBeenCalled();
  });
});
