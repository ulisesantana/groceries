import classNames from "classnames";
import React, { FC, RefObject, useRef, useState } from "react";
import { BsFillCartFill, FaExclamation } from "react-icons/all";
import { Item, palette } from "../../../../domain";
import { messages } from "../../../../messages";
import { ColorUtils } from "../../color-utils";
import { useStore } from "../../store";
import "./ListItemRow.scss";

export interface ListItemProps {
  item: Item;
}

function retry(exitCondition: Function, callback: Function, ms: number) {
  setTimeout(() => {
    if (exitCondition()) {
      callback();
    } else {
      retry(exitCondition, callback, ms);
    }
  }, ms);
}

export const ListItemsRow: FC<ListItemProps> = ({ item }) => {
  const { actions } = useStore();
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputQuantityRef = useRef<HTMLInputElement>(null);
  const [readMode, setReadMode] = useState(true);
  const color = item.category.color;
  const backgroundColor = ColorUtils.setLuminosity(color, 0.8);
  const accentColor = ColorUtils.isGrayscale(color)
    ? palette.purple
    : ColorUtils.setLuminosity(color, 0.3);
  const mandatoryColor = palette.red;
  const disabledColor = ColorUtils.isGrayscale(color)
    ? ColorUtils.setLuminosity(palette.purple, 0.96)
    : palette.gray;

  const goToItemDetails = () => {
    window.location.pathname = `/items/details/${item.id.value}`;
  };
  const enableWriteMode = () => setReadMode(false);
  const enableReadMode = () => setReadMode(true);
  const focusInput = (inputRef: RefObject<HTMLInputElement>) => {
    enableWriteMode();
    const isInputReady = () => inputRef?.current?.focus !== undefined;
    const focus = () => inputRef?.current?.focus();
    if (isInputReady()) {
      focus();
    } else {
      const ms = 1;
      retry(isInputReady, focus, ms);
      console.debug(`retrying to focus input in ${ms} ms`);
    }
  };
  const focusItemName = () => {
    enableWriteMode();
    focusInput(inputNameRef);
  };
  const focusItemQuantity = () => {
    enableWriteMode();
    focusInput(inputQuantityRef);
  };
  const updateName = () => {
    const newName = inputNameRef?.current?.value;
    if (newName && newName !== item.name) {
      const itemToUpdate = new Item({
        ...item,
        name: newName,
      });
      actions.updateItem(itemToUpdate).then(() => {
        console.log(
          `Item updated from "${item.name}" to "${itemToUpdate.name}"`
        );
      });
    }
    enableReadMode();
  };
  const updateQuantity = () => {
    const newQuantity = inputQuantityRef?.current?.value;
    if (newQuantity !== null) {
      const itemToUpdate = new Item({
        ...item,
        quantity: Number(newQuantity),
      });
      actions.updateItem(itemToUpdate).then(() => {
        console.log(
          `Item "${item.name}" updated quantity from "${item.quantity}" to "${itemToUpdate.quantity}"`
        );
      });
    }
    enableReadMode();
  };
  return (
    <div
      className="ListItemsRow"
      data-testid={item.id.value}
      style={{
        backgroundColor,
      }}
      onDoubleClick={goToItemDetails}
    >
      <span className="quantity">
        {readMode ? (
          <button onClick={focusItemQuantity}>{item.quantity}</button>
        ) : (
          <input
            type="number"
            inputMode="numeric"
            aria-label={messages.itemForm.quantityInput}
            ref={inputQuantityRef}
            defaultValue={item.quantity}
            onBlur={updateQuantity}
          />
        )}
      </span>
      <span className="item">
        {readMode ? (
          <button onClick={focusItemName}>{item.name}</button>
        ) : (
          <input
            type="text"
            ref={inputNameRef}
            aria-label={messages.itemForm.nameInput}
            defaultValue={item.name}
            onBlur={updateName}
          />
        )}
      </span>
      <span className="is-required">
        {item.isRequired ? (
          <button
            aria-label={messages.actions.setItemAsNotRequired}
            onClick={() => actions.setItemAsNotRequired(item.id)}
          >
            <BsFillCartFill size={32} color={accentColor} />
          </button>
        ) : (
          <button
            aria-label={messages.actions.setItemAsRequired}
            onClick={() => actions.setItemAsRequired(item.id)}
          >
            <BsFillCartFill size={32} color={disabledColor} />
          </button>
        )}
      </span>
      <span className="is-mandatory">
        {item.isMandatory ? (
          <button
            aria-label={messages.actions.setItemAsNotMandatory}
            onClick={() => actions.setItemAsNotMandatory(item.id)}
          >
            <FaExclamation size={32} color={mandatoryColor} />
          </button>
        ) : (
          <button
            aria-label={messages.actions.setItemAsMandatory}
            onClick={() => actions.setItemAsMandatory(item.id)}
          >
            <FaExclamation size={32} color={disabledColor} />
          </button>
        )}
      </span>
    </div>
  );
};
