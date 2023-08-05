import React from "react";
import { Category } from "../../../../domain";
import { ErrorCodes } from "../../../../domain/errors/ErrorCodes";
import { messages } from "../../../../messages";
import { StoreActions, useStore } from "../../store";
import { CategoryForm, CategoryFormProps } from "../CategoryForm";

export function CreateCategoryForm() {
  const { actions } = useStore();
  const action = generateAction(actions);

  return <CategoryForm action={action} />;
}

function generateAction(actions: StoreActions): CategoryFormProps["action"] {
  return (setSuccessMessage: Function, setErrorMessage: Function) =>
    (category: Category) => {
      actions
        .createCategory(category)
        .then(() => {
          setErrorMessage("");
          setSuccessMessage(messages.categoryForm.success.create);
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        })
        .catch((error) => {
          setSuccessMessage("");
          if (error.code === ErrorCodes.CategoryAlreadyExists) {
            setErrorMessage(
              messages.categoryForm.errors.categoryAlreadyExists(category)
            );
          } else {
            setErrorMessage(messages.categoryForm.errors.unknown(error));
          }
        });
    };
}
