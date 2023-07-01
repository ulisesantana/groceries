import { describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  CategoryRepository,
  CreateCategoryCase,
} from "../../../../application";
import { Category, CategoryList } from "../../../../domain";
import { UseCasesBuilder } from "../../../../tests/builders/use-cases-builder";
import React from "react";
import { initStore } from "../../store";
import { UseCaseDouble } from "../../../../tests/doubles/use-case.double";
import { CreateCategoryForm } from "./CreateCategoryForm";
import userEvent from "@testing-library/user-event";
import { messages } from "../../../../messages";

describe("Create Category Form should", () => {
  it("create a new category", async () => {
    const category = {
      name: "Test Category",
      icon: "test-icon",
      color: "#ffffff",
    };
    const createCategoryDouble = new UseCaseDouble();

    await waitFor(() =>
      initStore(
        UseCasesBuilder.init()
          .withCreateCategoryCase(createCategoryDouble)
          .build()
      )
    );
    render(<CreateCategoryForm />);

    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.nameInput),
      category.name
    );
    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.iconInput),
      category.icon
    );
    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.colorInput),
      category.color
    );

    await userEvent.click(
      screen.getByLabelText(messages.createCategoryForm.submitButton)
    );

    await waitFor(() => createCategoryDouble.assertHasBeenCalled());
  });

  it("show error message if new category already exist", async () => {
    const category = new Category({
      name: "Test Category",
      icon: "test-icon",
      color: "#ffffff",
    });
    const categoriesRepository = {
      findAll: vi.fn(async () => new CategoryList([new Category(category)])),
      save: vi.fn(async () => {}),
    } as unknown as CategoryRepository;
    const createCategoryCase = new CreateCategoryCase(categoriesRepository);

    await waitFor(() =>
      initStore(
        UseCasesBuilder.init()
          .withCreateCategoryCase(createCategoryCase)
          .build()
      )
    );
    render(<CreateCategoryForm />);

    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.nameInput),
      category.name
    );
    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.iconInput),
      category.icon
    );
    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.colorInput),
      category.color
    );

    await userEvent.click(
      screen.getByLabelText(messages.createCategoryForm.submitButton)
    );

    screen.getByText(
      messages.createCategoryForm.errors.categoryAlreadyExists(category)
    );
  });

  it("show error message for unknown errors", async () => {
    const category = new Category({
      name: "Test Category",
      icon: "test-icon",
      color: "#ffffff",
    });
    const error = new Error("Boom!! 💥");
    const createCategoryDouble = {
      exec() {
        throw error;
      },
    } as unknown as CreateCategoryCase;

    await waitFor(() =>
      initStore(
        UseCasesBuilder.init()
          .withCreateCategoryCase(createCategoryDouble)
          .build()
      )
    );
    render(<CreateCategoryForm />);

    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.nameInput),
      category.name
    );
    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.iconInput),
      category.icon
    );
    await userEvent.type(
      screen.getByLabelText(messages.createCategoryForm.colorInput),
      category.color
    );

    await userEvent.click(
      screen.getByLabelText(messages.createCategoryForm.submitButton)
    );

    screen.getByText(messages.createCategoryForm.errors.unknown(error));
  });
});
