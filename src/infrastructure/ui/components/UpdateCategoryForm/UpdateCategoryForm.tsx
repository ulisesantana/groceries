import React from "react";
import { Category } from "../../../../domain";
import { ErrorCodes } from "../../../../domain/errors/ErrorCodes";
import { messages } from "../../../../messages";
import { StoreActions, useStore } from "../../store";
import { CategoryForm, CategoryFormProps } from "../CategoryForm";

interface UpdateCategoryFormProps {
  category: Category;
}

export function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  const { actions } = useStore();
  const action = generateAction(actions);

  return <CategoryForm action={action} category={category} />;
}

function generateAction(actions: StoreActions): CategoryFormProps["action"] {
  return (setSuccessMessage: Function, setErrorMessage: Function) =>
    (category: Category) => {
      actions
        .updateCategory(category)
        .then(() => {
          setErrorMessage("");
          setSuccessMessage(messages.categoryForm.success.update);
          // TODO: Trigger timeout for clearing messages?
        })
        .catch((error) => {
          setSuccessMessage("");
          if (error.code === ErrorCodes.CategoryNotFound) {
            setErrorMessage(
              messages.categoryForm.errors.categoryDoesNotExist(category)
            );
          } else {
            setErrorMessage(messages.categoryForm.errors.unknown(error));
          }
        });
    };
}
