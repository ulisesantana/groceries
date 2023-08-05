import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import { ItemList } from "../../../../domain";
import { messages } from "../../../../messages";
import { ItemBuilder } from "../../../../tests/builders";
import { UseCasesBuilder } from "../../../../tests/builders/use-cases-builder";
import { GetItemsCaseDouble } from "../../../../tests/doubles";
import { initStore } from "../../store";
import { Groceries } from "./Groceries";

describe("Groceries view should", () => {
  it("fetch items and render them", async () => {
    const items = new ItemList(
      Array.from({ length: 3 }).map(ItemBuilder.random)
    );
    const getAllItemsDouble = new GetItemsCaseDouble([items]);

    await waitFor(() =>
      initStore(
        UseCasesBuilder.init().withGetItemsCase(getAllItemsDouble).build()
      )
    );
    render(<Groceries />);

    await waitFor(() => getAllItemsDouble.assertHasBeenCalled());
    for (const item of items.values) {
      await screen.findByText(item.name);
    }
  });

  it("filter items by search", async () => {
    const items = new ItemList([
      ItemBuilder.init().withName("cookies").build(),
      ItemBuilder.init().withName("cream").build(),
      ItemBuilder.init().withName("milk").build(),
    ]);
    const getAllItemsDouble = new GetItemsCaseDouble([items]);

    await waitFor(() =>
      initStore(
        UseCasesBuilder.init().withGetItemsCase(getAllItemsDouble).build()
      )
    );
    render(<Groceries />);
    await userEvent.click(screen.getByLabelText(messages.menu.searchCTA));
    await userEvent.type(
      screen.getByLabelText(messages.search.searchInput),
      "m"
    );

    await waitFor(() => {
      screen.getByText(items.values.at(1)!.name);
      screen.getByText(items.values.at(2)!.name);
      expect(
        screen.queryByText(items.values.at(0)!.name)
      ).not.toBeInTheDocument();
    });
  });

  it("navigate to buy list", async () => {
    const items = new ItemList([
      ItemBuilder.init().withName("cookies").withIsRequired(true).build(),
      ItemBuilder.init().withName("cream").withIsRequired(false).build(),
      ItemBuilder.init().withName("milk").withIsRequired(false).build(),
    ]);
    const getAllItemsDouble = new GetItemsCaseDouble([items]);
    await waitFor(() =>
      initStore(
        UseCasesBuilder.init().withGetItemsCase(getAllItemsDouble).build()
      )
    );
    render(<Groceries />);
    await waitFor(() => {
      screen.getByLabelText(messages.menu.requiredListCTA);
    });

    await userEvent.click(screen.getByLabelText(messages.menu.requiredListCTA));

    await waitFor(() => {
      screen.getByText(items.values.at(0)!.name);
      expect(
        screen.queryByText(items.values.at(2)!.name)
      ).not.toBeInTheDocument();
    });
    expect(
      screen.queryByText(items.values.at(1)!.name)
    ).not.toBeInTheDocument();
  });

  it("navigate to mandatory buy list", async () => {
    const items = new ItemList([
      ItemBuilder.init()
        .withName("cookies")
        .withIsRequired(true)
        .withIsMandatory(false)
        .build(),
      ItemBuilder.init()
        .withName("cream")
        .withIsRequired(true)
        .withIsMandatory(true)
        .build(),
      ItemBuilder.init()
        .withName("milk")
        .withIsRequired(false)
        .withIsMandatory(false)
        .build(),
    ]);
    const getAllItemsDouble = new GetItemsCaseDouble([items]);
    await waitFor(() =>
      initStore(
        UseCasesBuilder.init().withGetItemsCase(getAllItemsDouble).build()
      )
    );
    render(<Groceries />);
    await waitFor(() => {
      screen.getByLabelText(messages.menu.mandatoryListCTA);
    });

    await userEvent.click(
      screen.getByLabelText(messages.menu.mandatoryListCTA)
    );

    await waitFor(() => {
      screen.getByText(items.values.at(1)!.name);
      expect(
        screen.queryByText(items.values.at(2)!.name)
      ).not.toBeInTheDocument();
    });
    expect(
      screen.queryByText(items.values.at(0)!.name)
    ).not.toBeInTheDocument();
  });
});
