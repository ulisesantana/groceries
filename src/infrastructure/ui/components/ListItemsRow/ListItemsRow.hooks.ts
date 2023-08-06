import { RefObject, useCallback, useRef, useState } from "react";
import { Item, palette } from "../../../../domain";
import { ColorUtils } from "../../color-utils";
import { StoreActions, useStore } from "../../store";

function retry(exitCondition: Function, callback: Function, ms: number) {
  setTimeout(() => {
    if (exitCondition()) {
      callback();
    } else {
      retry(exitCondition, callback, ms);
    }
  }, ms);
}

interface GenerateUpdateItemWithInputValueHandlerParams {
  inputRef: RefObject<HTMLInputElement>;
  validation: (value: string | undefined) => boolean;
  property: keyof Item;
  enableReadMode: () => void;
  item: Item;
  actions: StoreActions;
}

function generateUpdateItemWithInputValueHandler({
  inputRef,
  validation,
  property,
  enableReadMode,
  item,
  actions,
}: GenerateUpdateItemWithInputValueHandlerParams) {
  return () => {
    const newValue = inputRef?.current?.value;
    if (validation(newValue)) {
      const itemToUpdate = new Item({
        ...item,
        [property]: newValue,
      });
      actions.updateItem(itemToUpdate).catch(console.error);
    }
    enableReadMode();
  };
}

function generateInputFocus(
  inputRef: RefObject<HTMLInputElement>,
  enableWriteMode: () => void
) {
  return () => {
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
}

export function useListItemRowColors(item: Item) {
  const color = item.category.color;
  return {
    accentColor: ColorUtils.isGrayscale(color)
      ? palette.purple
      : ColorUtils.setLuminosity(color, 0.3),
    backgroundColor: ColorUtils.setLuminosity(color, 0.8),
    disabledColor: ColorUtils.isGrayscale(color)
      ? ColorUtils.setLuminosity(palette.purple, 0.96)
      : palette.gray,
    mandatoryColor: palette.red,
  };
}

export function useListItemRow(item: Item) {
  const { actions } = useStore();
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputQuantityRef = useRef<HTMLInputElement>(null);
  const [readMode, setReadMode] = useState(true);
  const enableWriteMode = () => setReadMode(false);
  const enableReadMode = () => setReadMode(true);

  return {
    focusItemNameInput: generateInputFocus(inputNameRef, enableWriteMode),
    focusItemQuantityInput: generateInputFocus(
      inputQuantityRef,
      enableWriteMode
    ),
    goToItemDetails: useCallback(() => {
      window.location.pathname = `/items/details/${item.id.value}`;
    }, [item]),
    inputNameRef,
    inputQuantityRef,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    updateName: useCallback(
      generateUpdateItemWithInputValueHandler({
        inputRef: inputNameRef,
        validation: (value) => (value && value !== item.name) as boolean,
        property: "name",
        enableReadMode,
        actions,
        item,
      }),
      [actions, setReadMode, item, enableReadMode, inputNameRef]
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    updateQuantity: useCallback(
      generateUpdateItemWithInputValueHandler({
        inputRef: inputQuantityRef,
        validation: (value) => value !== undefined,
        property: "quantity",
        enableReadMode,
        actions,
        item,
      }),
      [actions, setReadMode, item, enableReadMode, inputQuantityRef]
    ),
  };
}
