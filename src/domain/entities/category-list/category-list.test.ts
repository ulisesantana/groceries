import { describe, expect, it } from "vitest";
import { CategoryBuilder } from "../../../tests/builders";
import { CategoryList } from "./category-list";

describe("Category List should", () => {
  const categories = [
    CategoryBuilder.init().withName("Sauces").build(),
    CategoryBuilder.init().withName("Candies").build(),
    CategoryBuilder.init().withName("Beverages").build(),
    CategoryBuilder.init().withName("Fruit").build(),
  ];

  it("return all categories sorted", () => {
    expect(new CategoryList(categories).values).toStrictEqual([
      categories.at(2),
      categories.at(1),
      categories.at(3),
      categories.at(0),
    ]);
  });

  it("check if category is already in the list", () => {
    const list = new CategoryList(categories);
    const [category] = categories;
    expect(list.has(categories.at(0)!)).toBeTruthy();
    expect(
      list.has(CategoryBuilder.init().withName(category.name).build())
    ).toBeTruthy();
  });

  it("find category by id", () => {
    const categories = [
      CategoryBuilder.random(),
      CategoryBuilder.random(),
      CategoryBuilder.random(),
    ];
    const category = categories.at(1);

    expect(new CategoryList(categories).findById(category!.id)).toStrictEqual(
      category
    );
  });
});
