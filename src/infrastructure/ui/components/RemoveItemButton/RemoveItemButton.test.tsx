import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { messages } from "../../../../messages";
import { ItemBuilder } from "../../../../tests/builders";
import { RemoveItemButton } from "./RemoveItemButton";

describe("Remove Item Button should", () => {
  const item = ItemBuilder.random();
  afterEach(() => {
    cleanup();
  });

  it("show confirm dialog before deleting item", async () => {
    const removeItemUseCase = vi.fn();
    render(
      <RemoveItemButton removeItemUseCase={removeItemUseCase} item={item} />
    );

    await userEvent.click(screen.getByLabelText(messages.removeItemButton.cta));
    screen.getByText(messages.removeItemButton.dialogText);
    expect(removeItemUseCase).not.toBeCalled();
  });

  it("delete item after confirming deletion on dialog", async () => {
    const removeItemUseCase = vi.fn();
    render(
      <RemoveItemButton removeItemUseCase={removeItemUseCase} item={item} />
    );

    await userEvent.click(screen.getByLabelText(messages.removeItemButton.cta));
    await userEvent.click(screen.getByText(messages.removeItemButton.confirm));

    expect(removeItemUseCase).toBeCalled();
  });

  it("doesn't delete item after cancelling deletion on dialog", async () => {
    const removeItemUseCase = vi.fn();
    render(
      <RemoveItemButton removeItemUseCase={removeItemUseCase} item={item} />
    );

    await userEvent.click(screen.getByLabelText(messages.removeItemButton.cta));
    await userEvent.click(screen.getByText(messages.removeItemButton.cancel));

    expect(removeItemUseCase).not.toBeCalled();
    expect(
      screen.queryByText(messages.removeItemButton.dialogText)
    ).not.toBeInTheDocument();
  });
});
