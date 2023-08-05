import React from "react";
import { Category, Item } from "../../../../domain";
import { messages } from "../../../../messages";
import { ItemForm, ItemFormProps } from "../ItemForm";

interface CreateItemFormProps {
  createItemUseCase: (item: Item) => Promise<void>;
  categories: Category[];
}

export function CreateItemForm({
  categories,
  createItemUseCase,
}: CreateItemFormProps) {
  const action = generateAction(createItemUseCase);

  return <ItemForm action={action} categories={categories} />;
}

function generateAction(
  createItemUseCase: CreateItemFormProps["createItemUseCase"]
): ItemFormProps["action"] {
  return (setSuccessMessage: Function, setErrorMessage: Function) =>
    (item: Item) => {
      createItemUseCase(item)
        .then(() => {
          setErrorMessage("");
          setSuccessMessage(messages.itemForm.success.create);
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        })
        .catch((error) => {
          setSuccessMessage("");
          setErrorMessage(messages.itemForm.errors.unknown(error));
        });
    };
}
