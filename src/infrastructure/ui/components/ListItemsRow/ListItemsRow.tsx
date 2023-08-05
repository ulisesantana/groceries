import React, { FC } from "react";
import { BsFillCartFill, BsFillStarFill } from "react-icons/bs";
import { Link } from "wouter";
import { Item, palette } from "../../../../domain";
import { messages } from "../../../../messages";
import { ColorUtils } from "../../color-utils";
import { useStore } from "../../store";
import "./ListItemRow.scss";

export interface ListItemProps {
  item: Item;
}

export const ListItemsRow: FC<ListItemProps> = ({ item }) => {
  const { actions } = useStore();
  const color = item.category.color;
  const backgroundColor = ColorUtils.setLuminosity(color, 0.8);
  const accentColor = ColorUtils.isGrayscale(color)
    ? palette.purple
    : ColorUtils.setLuminosity(color, 0.3);
  const mandatoryColor = palette.red;
  const disabledColor = ColorUtils.isGrayscale(color)
    ? ColorUtils.setLuminosity(palette.purple, 0.96)
    : palette.gray;
  return (
    <div
      className="ListItemsRow"
      data-testid={item.id.value}
      style={{
        backgroundColor,
      }}
    >
      <span className="quantity">{item.quantity}</span>
      <Link to={`/items/details/${item.id.value}`}>
        <span className="item">{item.name}</span>
      </Link>
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
            <BsFillCartFill size={32} color={palette.gray} />
          </button>
        )}
      </span>
      <span className="is-mandatory">
        {item.isMandatory ? (
          <button
            aria-label={messages.actions.setItemAsNotMandatory}
            onClick={() => actions.setItemAsNotMandatory(item.id)}
          >
            <BsFillStarFill size={32} color={mandatoryColor} />
          </button>
        ) : (
          <button
            aria-label={messages.actions.setItemAsMandatory}
            onClick={() => actions.setItemAsMandatory(item.id)}
          >
            <BsFillStarFill size={32} color={palette.gray} />
          </button>
        )}
      </span>
    </div>
  );
};
