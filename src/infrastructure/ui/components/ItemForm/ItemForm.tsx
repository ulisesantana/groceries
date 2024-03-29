import classNames from "classnames";
import React, { FormEventHandler, useState } from "react";
import { Category, Item } from "../../../../domain";
import { messages } from "../../../../messages";
import { routes } from "../../routes";

export type ItemAction = (item: Item) => void;
export interface ItemFormProps {
  action: (
    setSuccessMessage: Function,
    setErrorMessage: Function
  ) => ItemAction;
  categories: Category[];
  item?: Item;
}

export function ItemForm({ action, item, categories }: ItemFormProps) {
  const submitText = item
    ? messages.itemForm.submitButton.update
    : messages.itemForm.submitButton.create;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitHandler = generateOnSubmitHandler(
    action(setSuccessMessage, setErrorMessage),
    categories,
    item
  );

  return categories.length ? (
    <form className="ItemForm" onSubmit={onSubmitHandler}>
      <label htmlFor="name">{messages.itemForm.nameInput}</label>
      <input
        type="text"
        name="name"
        id="name"
        aria-label={messages.itemForm.nameInput}
        required
        defaultValue={item?.name}
      />
      <label htmlFor="quantity">{messages.itemForm.quantityInput}</label>
      <input
        type="number"
        inputMode="numeric"
        name="quantity"
        id="quantity"
        aria-label={messages.itemForm.quantityInput}
        required
        defaultValue={item?.quantity ?? 1}
      />
      <label htmlFor="category">{messages.itemForm.categoryInput}</label>
      <select
        name="category"
        id="category"
        aria-label={messages.itemForm.categoryInput}
        required
        defaultValue={item?.category.id.value}
      >
        {categories.map((c) => (
          <option key={c.id.value} value={c.id.value}>
            {c.title}
          </option>
        ))}
      </select>
      <label htmlFor="isRequired">
        <input
          type="checkbox"
          name="isRequired"
          id="isRequired"
          aria-label={messages.itemForm.isRequiredInput}
          defaultChecked={item?.isRequired}
        />
        {messages.itemForm.isRequiredInput}
      </label>
      <label htmlFor="isMandatory">
        <input
          type="checkbox"
          name="isMandatory"
          id="isMandatory"
          aria-label={messages.itemForm.isMandatoryInput}
          defaultChecked={item?.isMandatory}
        />
        {messages.itemForm.isMandatoryInput}
      </label>

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
  ) : (
    <div className="padded-info">
      <span>{messages.itemForm.errors.thereAreNoCategories.message}</span>
      <span>
        <a
          href={routes.categories.create}
          aria-label={messages.itemForm.errors.thereAreNoCategories.cta}
        >
          <button>{messages.itemForm.errors.thereAreNoCategories.cta}</button>
        </a>
      </span>
    </div>
  );
}

function generateOnSubmitHandler(
  action: ItemAction,
  categories: Category[],
  oldItem: Item = {} as Item
): FormEventHandler<HTMLFormElement> {
  return (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const categoryId = formData.get("category") as string;
    const isMandatory = formData.get("isMandatory") === "on";
    const item = new Item({
      ...oldItem,
      name: String(formData.get("name")).trim(),
      quantity: Number(formData.get("quantity")),
      isRequired: formData.get("isRequired") === "on" || isMandatory,
      isMandatory: isMandatory,
      category: categories.find((c) => c.id.value === categoryId)!,
    });
    action(item);
  };
}
