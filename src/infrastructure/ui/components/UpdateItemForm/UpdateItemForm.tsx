import React from "react";
import { Category, Item } from "../../../../domain";
import { ErrorCodes } from "../../../../domain/errors/ErrorCodes";
import { messages } from "../../../../messages";
import { ItemForm, ItemFormProps } from "../ItemForm";

interface UpdateItemFormProps {
  updateItemUseCase: (item: Item) => Promise<void>;
  categories: Category[];
  item: Item;
}

export function UpdateItemForm({
  updateItemUseCase,
  ...props
}: UpdateItemFormProps) {
  const action = generateAction(updateItemUseCase);

  return <ItemForm action={action} {...props} />;
}

function generateAction(
  updateItemUseCase: UpdateItemFormProps["updateItemUseCase"]
): ItemFormProps["action"] {
  return (setSuccessMessage: Function, setErrorMessage: Function) =>
    (item: Item) => {
      updateItemUseCase(item)
        .then(() => {
          setErrorMessage("");
          setSuccessMessage(messages.itemForm.success.update);
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        })
        .catch((error) => {
          setSuccessMessage("");
          if (error.code === ErrorCodes.ItemNotFound) {
            setErrorMessage(messages.itemForm.errors.itemDoesNotExist(item));
          } else {
            setErrorMessage(messages.itemForm.errors.unknown(error));
          }
        });
    };
}
