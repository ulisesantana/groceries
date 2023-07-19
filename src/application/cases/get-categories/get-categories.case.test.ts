import { describe, expect, it, vi } from "vitest";
import { CategoryRepository } from "../../repositories";
import { CategoryList } from "../../../domain";
import { CategoryBuilder } from "../../../tests/builders";
import { GetCategoriesCase } from "./get-categories.case";

describe("Get categories use case should", () => {
  it("return all categories", async () => {
    const categories = new CategoryList(
      Array.from({ length: 3 }).map(CategoryBuilder.random)
    );
    const categoryRepository = {
      findAll: vi.fn(async () => categories),
    } as unknown as CategoryRepository;

    const result = await new GetCategoriesCase(categoryRepository).exec();

    expect(categoryRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(categories);
  });
});
