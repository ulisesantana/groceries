import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, it, vi } from "vitest";
import {
  CategoryRepository,
  UpdateCategoryCase,
} from "../../../../application";
import { Category, CategoryList } from "../../../../domain";
import { messages } from "../../../../messages";
import { UseCasesBuilder } from "../../../../tests/builders/use-cases-builder";
import { initStore } from "../../store";
import { UpdateCategoryForm } from "./UpdateCategoryForm";

describe("Update Category Form should", () => {
  it("update a category", async () => {
    const category = new Category({
      name: "Test Category",
      icon: "test-icon",
      color: "#ffffff",
    });
    const newName = "Irrelevant Category";
    const categoriesRepository = {
      findAll: vi.fn(async () => new CategoryList([category])),
      save: vi.fn(async () => {}),
    } as unknown as CategoryRepository;
    const updateCategoryCase = new UpdateCategoryCase(categoriesRepository);

    await waitFor(() =>
      initStore(
        UseCasesBuilder.init()
          .withUpdateCategoryCase(updateCategoryCase)
          .build()
      )
    );
    render(<UpdateCategoryForm category={category} />);

    await userEvent.clear(
      screen.getByLabelText(messages.categoryForm.nameInput)
    );
    await userEvent.type(
      screen.getByLabelText(messages.categoryForm.nameInput),
      newName
    );

    await userEvent.click(
      screen.getByLabelText(messages.categoryForm.submitButton.update)
    );

    screen.getByText(messages.categoryForm.success.update);
  });

  it("show error message if the update category does not exist", async () => {
    const category = new Category({
      name: "Test Category",
      icon: "test-icon",
      color: "#ffffff",
    });
    const categoriesRepository = {
      findAll: vi.fn(async () => new CategoryList([])),
      save: vi.fn(async () => {}),
    } as unknown as CategoryRepository;
    const updateCategoryCase = new UpdateCategoryCase(categoriesRepository);

    await waitFor(() =>
      initStore(
        UseCasesBuilder.init()
          .withUpdateCategoryCase(updateCategoryCase)
          .build()
      )
    );
    render(<UpdateCategoryForm category={category} />);

    await userEvent.click(
      screen.getByLabelText(messages.categoryForm.submitButton.update)
    );

    screen.getByText(
      messages.categoryForm.errors.categoryDoesNotExist(category)
    );
  });

  it("show error message for unknown errors", async () => {
    const category = new Category({
      name: "Test Category",
      icon: "test-icon",
      color: "#ffffff",
    });
    const error = new Error("Boom!! 💥");
    const updateCategoryDouble = {
      exec() {
        throw error;
      },
    } as unknown as UpdateCategoryCase;

    await waitFor(() =>
      initStore(
        UseCasesBuilder.init()
          .withUpdateCategoryCase(updateCategoryDouble)
          .build()
      )
    );
    render(<UpdateCategoryForm category={category} />);

    await userEvent.click(
      screen.getByLabelText(messages.categoryForm.submitButton.update)
    );

    screen.getByText(messages.categoryForm.errors.unknown(error));
  });
});
