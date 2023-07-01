import classNames from "classnames";
import React, { FormEventHandler, useState } from "react";
import { Category } from "../../../../domain";
import { ErrorCodes } from "../../../../domain/errors/ErrorCodes";
import { messages } from "../../../../messages";
import { StoreActions, useStore } from "../../store";
import "./CreateCategoryForm.scss";

export function CreateCategoryForm() {
  const { actions } = useStore();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitHandler = generateOnSubmitHandler(actions, setErrorMessage);

  return (
    <form className="CreateCategoryForm" onSubmit={onSubmitHandler}>
      <label htmlFor="name">{messages.createCategoryForm.nameInput}</label>
      <input
        type="text"
        name="name"
        aria-label={messages.createCategoryForm.nameInput}
        required
      />
      <label htmlFor="icon">{messages.createCategoryForm.iconInput}</label>
      <input
        type="text"
        name="icon"
        aria-label={messages.createCategoryForm.iconInput}
        placeholder={messages.createCategoryForm.iconInputPlaceholder}
        required
      />
      <label htmlFor="color">{messages.createCategoryForm.colorInput}</label>
      <input
        type="color"
        name="color"
        aria-label={messages.createCategoryForm.colorInput}
        required
      />
      <span className={classNames("error-box", { active: errorMessage })}>
        {errorMessage}
      </span>
      <button
        type="submit"
        aria-label={messages.createCategoryForm.submitButton}
      >
        {messages.createCategoryForm.submitButton}
      </button>
    </form>
  );
}

function generateOnSubmitHandler(
  actions: StoreActions,
  setErrorMessage: Function
): FormEventHandler<HTMLFormElement> {
  return (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const category = new Category({
      name: formData.get("name") as string,
      icon: formData.get("icon") as string,
      color: formData.get("color") as string,
    });
    actions.createCategory(category).catch((error) => {
      if (error.code === ErrorCodes.CategoryAlreadyExists) {
        setErrorMessage(
          messages.createCategoryForm.errors.categoryAlreadyExists(category)
        );
      } else {
        setErrorMessage(messages.createCategoryForm.errors.unknown(error));
      }
    });
  };
}
