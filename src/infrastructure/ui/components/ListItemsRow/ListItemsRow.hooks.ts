import { RefObject, useCallback, useRef, useState } from "react";
import { Item, palette } from "../../../../domain";
import { ColorUtils } from "../../color-utils";
import { useStore } from "../../store";

function retry(exitCondition: Function, callback: Function, ms: number) {
  setTimeout(() => {
    if (exitCondition()) {
      callback();
    } else {
      retry(exitCondition, callback, ms);
    }
  }, ms);
}

export function useListItemRow(item: Item) {
  const { actions } = useStore();
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputQuantityRef = useRef<HTMLInputElement>(null);
  const [readMode, setReadMode] = useState(true);
  const color = item.category.color;

  const enableWriteMode = () => setReadMode(false);
  const enableReadMode = () => setReadMode(true);
  const generateInputFocus = (inputRef: RefObject<HTMLInputElement>) => () => {
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
  function updateName() {
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
  }
  function updateQuantity() {
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
  }
  return {
    accentColor: ColorUtils.isGrayscale(color)
      ? palette.purple
      : ColorUtils.setLuminosity(color, 0.3),
    backgroundColor: ColorUtils.setLuminosity(color, 0.8),
    disabledColor: ColorUtils.isGrayscale(color)
      ? ColorUtils.setLuminosity(palette.purple, 0.96)
      : palette.gray,
    focusItemNameInput: generateInputFocus(inputNameRef),
    focusItemQuantityInput: generateInputFocus(inputQuantityRef),
    goToItemDetails: useCallback(() => {
      window.location.pathname = `/items/details/${item.id.value}`;
    }, [item]),
    inputNameRef,
    inputQuantityRef,
    mandatoryColor: palette.red,
    readMode,
    setAsNotMandatory: useCallback(
      () => actions.setItemAsNotMandatory(item.id),
      [item, actions]
    ),
    setAsMandatory: useCallback(
      () => actions.setItemAsMandatory(item.id),
      [item, actions]
    ),
    setAsNotRequired: useCallback(
      () => actions.setItemAsNotRequired(item.id),
      [item, actions]
    ),
    setAsRequired: useCallback(
      () => actions.setItemAsRequired(item.id),
      [item, actions]
    ),
    updateName,
    updateQuantity,
  };
}
