import React from "react";
import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemBuilder } from "../../../../tests/builders";
import { messages } from "../../../../messages";
import { ListItems } from "./ListItems";
import { Item, VisibilityDictionary } from "../../../../domain";

describe("ListItems should", () => {
  const categoryVisibilityDictionary = new VisibilityDictionary();
  const onClick = vi.fn();
  it("show a list of items separated by categories", () => {
    const items = Array(3).map(ItemBuilder.random);
    render(
      <ListItems
        items={items}
        onClick={onClick}
        categoriesVisibilityDictionary={categoryVisibilityDictionary}
      />
    );

    items.forEach((item) => {
      screen.getByText(item.name);
      screen.getByText(item.category.name);
    });
  });

  it("show a message if there is no items to show", () => {
    render(
      <ListItems
        items={[]}
        onClick={onClick}
        categoriesVisibilityDictionary={categoryVisibilityDictionary}
      />
    );

    screen.getByText(messages.itemList.empty);
  });
  describe("show the amount of items passed", () => {
    it("if multiple items are passed", () => {
      const items = Array(3).map(ItemBuilder.random);
      render(
        <ListItems
          items={items}
          onClick={onClick}
          categoriesVisibilityDictionary={categoryVisibilityDictionary}
        />
      );

      screen.getByText(messages.itemList.total(items.length));
    });

    it("if one item is passed", () => {
      const items = Array(1).map(ItemBuilder.random);
      render(
        <ListItems
          items={items}
          onClick={onClick}
          categoriesVisibilityDictionary={categoryVisibilityDictionary}
        />
      );

      screen.getByText(messages.itemList.total(items.length));
    });
  });

  it("don't show the amount of items if the given list is empty", () => {
    const items = [] as Array<Item>;
    render(
      <ListItems
        items={items}
        onClick={onClick}
        categoriesVisibilityDictionary={categoryVisibilityDictionary}
      />
    );

    expect(screen.queryByText(items.length)).not.toBeInTheDocument();
  });
});
