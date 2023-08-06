import React, { FC } from "react";
import { Item } from "../../../../domain";
import {
  IsMandatoryInput,
  IsRequiredInput,
  ItemNameInput,
  ItemQuantityFunction,
} from "./Inputs";
import "./ListItemRow.scss";
import { useListItemRow, useListItemRowColors } from "./ListItemsRow.hooks";

export interface ListItemProps {
  item: Item;
}

export const ListItemsRow: FC<ListItemProps> = ({ item }) => {
  const {
    focusItemNameInput,
    focusItemQuantityInput,
    goToItemDetails,
    inputNameRef,
    inputQuantityRef,
    readMode,
    setAsMandatory,
    setAsNotMandatory,
    setAsRequired,
    setAsNotRequired,
    updateName,
    updateQuantity,
  } = useListItemRow(item);
  const { backgroundColor, accentColor, mandatoryColor, disabledColor } =
    useListItemRowColors(item);
  return (
    <div
      className="ListItemsRow"
      data-testid={item.name}
      style={{
        backgroundColor,
      }}
      onDoubleClick={goToItemDetails}
    >
      <span className="quantity">
        <ItemQuantityFunction
          readMode={readMode}
          onClick={focusItemQuantityInput}
          quantity={item.quantity}
          inputRef={inputQuantityRef}
          onBlur={updateQuantity}
        />
      </span>
      <span className="item">
        <ItemNameInput
          readMode={readMode}
          onClick={focusItemNameInput}
          name={item.name}
          inputRef={inputNameRef}
          onBlur={updateName}
        />
      </span>
      <span className="is-required" data-is-required={item.isRequired}>
        <IsRequiredInput
          color={accentColor}
          disabledColor={disabledColor}
          isRequired={item.isRequired}
          setAsRequired={setAsRequired}
          setAsNotRequired={setAsNotRequired}
        />
      </span>
      <span className="is-mandatory" data-is-mandatory={item.isMandatory}>
        <IsMandatoryInput
          color={mandatoryColor}
          disabledColor={disabledColor}
          isMandatory={item.isMandatory}
          setAsMandatory={setAsMandatory}
          setAsNotMandatory={setAsNotMandatory}
        />
      </span>
    </div>
  );
};
