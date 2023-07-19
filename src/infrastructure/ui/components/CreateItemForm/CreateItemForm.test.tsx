import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import { Item } from "../../../../domain";
import { messages } from "../../../../messages";
import { CategoryBuilder, ItemBuilder } from "../../../../tests/builders";
import { UseCaseDouble } from "../../../../tests/doubles/use-case.double";
import { CreateItemForm } from "./CreateItemForm";

describe("Create Item Form should", () => {
  const categories = Array.from({ length: 3 }).map(CategoryBuilder.random);
  const item = ItemBuilder.init()
    .withName("Water")
    .withQuantity(2)
    .withCategory(categories.at(1)!)
    .withIsRequired(true)
    .withIsMandatory(false)
    .build();
  it("create a new item", async () => {
    const createItemDouble = new UseCaseDouble();
    let createdItem: Item;
    const action = async (item: Item) => {
      // I'm not very proud about this way of spying values, but it works.
      createdItem = item;
      // @ts-ignore
      return createItemDouble.exec(item);
    };
    render(
      <CreateItemForm categories={categories} createItemUseCase={action} />
    );

    await fillForm(item);

    expect(createdItem!.name).toBe(item.name);
    expect(createdItem!.quantity).toBe(item.quantity);
    expect(createdItem!.isRequired).toBe(item.isRequired);
    expect(createdItem!.isMandatory).toBe(item.isMandatory);
    expect(createdItem!.category.id.value).toBe(item.category.id.value);
    screen.getByText(messages.itemForm.success.create);
  });

  it("create a new item as required if is set as mandatory", async () => {
    const mandatoryItem = ItemBuilder.clone(item)
      .withIsRequired(false)
      .withIsMandatory(true)
      .build();
    const createItemDouble = new UseCaseDouble();
    let createdItem: Item;
    const action = async (item: Item) => {
      // I'm not very proud about this way of spying values, but it works.
      createdItem = item;
      // @ts-ignore
      return createItemDouble.exec(item);
    };
    render(
      <CreateItemForm categories={categories} createItemUseCase={action} />
    );

    await fillForm(mandatoryItem);

    expect(createdItem!.isRequired).toBeTruthy();
    expect(createdItem!.isMandatory).toBeTruthy();
    screen.getByText(messages.itemForm.success.create);
  });

  it("show message in case there are no categories", async () => {
    const createItemDouble = new UseCaseDouble();
    const action = () => createItemDouble.exec();
    render(<CreateItemForm createItemUseCase={action} categories={[]} />);

    screen.getByText(messages.itemForm.errors.thereAreNoCategories.message);
    screen.getByText(messages.itemForm.errors.thereAreNoCategories.cta);
  });

  it("show error message for unknown errors", async () => {
    const error = new Error("Boom!! 💥");
    const action = async (item: Item) => {
      throw error;
    };
    render(
      <CreateItemForm createItemUseCase={action} categories={categories} />
    );

    await fillForm(item);

    screen.getByText(messages.itemForm.errors.unknown(error));
  });
});

async function fillForm(item: Item) {
  await userEvent.type(
    screen.getByLabelText(messages.itemForm.nameInput),
    item.name
  );

  await userEvent.clear(screen.getByLabelText(messages.itemForm.quantityInput));

  await userEvent.type(
    screen.getByLabelText(messages.itemForm.quantityInput),
    String(item.quantity)
  );

  await userEvent.selectOptions(
    screen.getByLabelText(messages.itemForm.categoryInput),
    item.category.id.value
  );

  if (item.isRequired) {
    await userEvent.click(
      screen.getByLabelText(messages.itemForm.isRequiredInput)
    );
  }

  if (item.isMandatory) {
    await userEvent.click(
      screen.getByLabelText(messages.itemForm.isMandatoryInput)
    );
  }

  await userEvent.click(
    screen.getByLabelText(messages.itemForm.submitButton.create)
  );
}
