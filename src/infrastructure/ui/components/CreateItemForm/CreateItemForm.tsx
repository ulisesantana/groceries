import React from "react";
import { Category, Item } from "../../../../domain";
import { ErrorCodes } from "../../../../domain/errors/ErrorCodes";
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
          // TODO: Trigger timeout for clearing messages?
        })
        .catch((error) => {
          setSuccessMessage("");
          if (error.code === ErrorCodes.ItemAlreadyExists) {
            setErrorMessage(messages.itemForm.errors.itemAlreadyExists(item));
          } else {
            setErrorMessage(messages.itemForm.errors.unknown(error));
          }
        });
    };
}
