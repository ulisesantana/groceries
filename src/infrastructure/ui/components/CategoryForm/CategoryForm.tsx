import classNames from "classnames";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { Category, palette } from "../../../../domain";
import { messages } from "../../../../messages";
import "../CategoryForm/CategoryForm.scss";

export type CategoryAction = (category: Category) => void;
export interface CategoryFormProps {
  action: (
    setSuccessMessage: Function,
    setErrorMessage: Function
  ) => CategoryAction;
  category?: Category;
}

export function CategoryForm({ action, category }: CategoryFormProps) {
  const colorRef = useRef<HTMLInputElement>(null);
  const submitText = category
    ? messages.categoryForm.submitButton.update
    : messages.categoryForm.submitButton.create;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitHandler = generateOnSubmitHandler(
    action(setSuccessMessage, setErrorMessage),
    category
  );

  useEffect(() => {
    if (colorRef.current) {
      colorRef.current.value = category?.color || palette.purple;
    }
  }, [category, colorRef]);

  return (
    <form className="CategoryForm" onSubmit={onSubmitHandler}>
      <label htmlFor="name">{messages.categoryForm.nameInput}</label>
      <input
        type="text"
        name="name"
        aria-label={messages.categoryForm.nameInput}
        required
        defaultValue={category?.name}
      />
      <label htmlFor="icon">{messages.categoryForm.iconInput}</label>
      <input
        type="text"
        name="icon"
        aria-label={messages.categoryForm.iconInput}
        placeholder={messages.categoryForm.iconInputPlaceholder}
        required
        defaultValue={category?.icon}
      />
      <label htmlFor="color">{messages.categoryForm.colorInput}</label>
      <input
        type="color"
        name="color"
        ref={colorRef}
        required
        aria-label={messages.categoryForm.colorInput}
      />
      <span className={classNames("success-box", { active: successMessage })}>
        {successMessage}
      </span>
      <span className={classNames("error-box", { active: errorMessage })}>
        {errorMessage}
      </span>
      <button type="submit" aria-label={submitText}>
        {submitText}
      </button>
    </form>
  );
}

function generateOnSubmitHandler(
  action: CategoryAction,
  oldCategory: Category = {} as Category
): FormEventHandler<HTMLFormElement> {
  return (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const category = new Category({
      ...oldCategory,
      name: formData.get("name") as string,
      icon: formData.get("icon") as string,
      color: formData.get("color") as string,
    });
    action(category);
  };
}
