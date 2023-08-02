import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemBuilder } from "../../../../tests/builders";
import { messages } from "../../../../messages";
import { ListItems } from "./ListItems";
import { Item } from "../../../../domain";

describe("ListItems should", () => {
  it("show a list of items separated by categories", () => {
    const items = Array(3).map(ItemBuilder.random);
    render(<ListItems items={items} />);

    items.forEach((item) => {
      screen.getByText(item.name);
      screen.getByText(item.category.name);
    });
  });

  it("show a message if there is no items to show", () => {
    render(<ListItems items={[]} />);

    screen.getByText(messages.itemList.empty);
  });
  describe("show the amount of items passed", () => {
    it("if multiple items are passed", () => {
      const items = Array(3).map(ItemBuilder.random);
      render(<ListItems items={items} />);

      screen.getByText(messages.itemList.total(items));
    });

    it("if one item is passed", () => {
      const items = Array(1).map(ItemBuilder.random);
      render(<ListItems items={items} />);

      screen.getByText(messages.itemList.total(items));
    });
  });

  it("don't show the amount of items if the given list is empty", () => {
    const items = [] as Array<Item>;
    render(<ListItems items={items} />);

    expect(screen.queryByText(items.length)).not.toBeInTheDocument();
  });
});
