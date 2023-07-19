import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, it } from "vitest";
import { Item, ItemNotFoundError } from "../../../../domain";
import { messages } from "../../../../messages";
import { CategoryBuilder, ItemBuilder } from "../../../../tests/builders";
import { UseCaseDouble } from "../../../../tests/doubles/use-case.double";
import { UpdateItemForm } from "./UpdateItemForm";

describe("Update Item Form should", () => {
  const categories = Array.from({ length: 3 }).map(CategoryBuilder.random);
  const item = ItemBuilder.init()
    .withName("Water")
    .withQuantity(2)
    .withCategory(categories.at(1)!)
    .withIsRequired(true)
    .withIsMandatory(false)
    .build();
  it("update an item", async () => {
    const newName = "Irrelevant Item";
    const updatedItem = ItemBuilder.clone(item).withName(newName).build();
    const createItemDouble = new UseCaseDouble();
    // @ts-ignore
    const action = async (item: Item) => createItemDouble.exec(item);

    render(
      <UpdateItemForm
        item={item}
        updateItemUseCase={action}
        categories={categories}
      />
    );

    await userEvent.clear(screen.getByLabelText(messages.itemForm.nameInput));
    await userEvent.type(
      screen.getByLabelText(messages.itemForm.nameInput),
      newName
    );

    await userEvent.click(
      screen.getByLabelText(messages.itemForm.submitButton.update)
    );

    screen.getByText(messages.itemForm.success.update);
    createItemDouble.assertHasBeenCalledWith(updatedItem);
  });

  it("show error message if the item to update does not exist", async () => {
    const action = async (item: Item) => {
      throw new ItemNotFoundError(item.id);
    };
    render(
      <UpdateItemForm
        item={item}
        categories={categories}
        updateItemUseCase={action}
      />
    );

    await userEvent.click(
      screen.getByLabelText(messages.itemForm.submitButton.update)
    );

    screen.getByText(messages.itemForm.errors.itemDoesNotExist(item));
  });

  it("show error message for unknown errors", async () => {
    const error = new Error("Boom!! 💥");
    const action = async (item: Item) => {
      throw error;
    };
    render(
      <UpdateItemForm
        item={item}
        categories={categories}
        updateItemUseCase={action}
      />
    );

    await userEvent.click(
      screen.getByLabelText(messages.itemForm.submitButton.update)
    );

    screen.getByText(messages.itemForm.errors.unknown(error));
  });
});
