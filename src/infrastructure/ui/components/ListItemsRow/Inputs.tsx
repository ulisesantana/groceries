import React, { RefObject } from "react";
import { BsFillCartFill, FaExclamation } from "react-icons/all";
import { messages } from "../../../../messages";

export function IsRequiredInput(props: {
  isRequired: boolean;
  setAsNotRequired: () => void;
  color: string;
  setAsRequired: () => void;
  disabledColor: string;
}) {
  return (
    <>
      {props.isRequired ? (
        <button
          aria-label={messages.actions.setItemAsNotRequired}
          onClick={props.setAsNotRequired}
        >
          <BsFillCartFill size={32} color={props.color} />
        </button>
      ) : (
        <button
          aria-label={messages.actions.setItemAsRequired}
          onClick={props.setAsRequired}
        >
          <BsFillCartFill size={32} color={props.disabledColor} />
        </button>
      )}
    </>
  );
}

export function IsMandatoryInput(props: {
  isMandatory: boolean;
  setAsNotMandatory: () => void;
  color: string;
  setAsMandatory: () => void;
  disabledColor: string | string;
}) {
  return (
    <>
      {props.isMandatory ? (
        <button
          aria-label={messages.actions.setItemAsNotMandatory}
          onClick={props.setAsNotMandatory}
        >
          <FaExclamation size={32} color={props.color} />
        </button>
      ) : (
        <button
          aria-label={messages.actions.setItemAsMandatory}
          onClick={props.setAsMandatory}
        >
          <FaExclamation size={32} color={props.disabledColor} />
        </button>
      )}
    </>
  );
}

export function ItemQuantityFunction(props: {
  readMode: boolean;
  onClick: () => void;
  quantity: number;
  inputRef: RefObject<HTMLInputElement>;
  onBlur: () => void;
}) {
  return (
    <>
      {props.readMode ? (
        <button onClick={props.onClick}>{props.quantity}</button>
      ) : (
        <input
          type="number"
          inputMode="numeric"
          aria-label={messages.itemForm.quantityInput}
          ref={props.inputRef}
          defaultValue={props.quantity}
          onBlur={props.onBlur}
        />
      )}
    </>
  );
}

export function ItemNameInput(props: {
  readMode: boolean;
  onClick: () => void;
  name: string;
  inputRef: RefObject<HTMLInputElement>;
  onBlur: () => void;
}) {
  return (
    <>
      {props.readMode ? (
        <button onClick={props.onClick}>{props.name}</button>
      ) : (
        <input
          type="text"
          ref={props.inputRef}
          aria-label={messages.itemForm.nameInput}
          defaultValue={props.name}
          onBlur={props.onBlur}
        />
      )}
    </>
  );
}
