import React, { FC } from "react";
import { BsFillCartFill, BsFillStarFill } from "react-icons/bs";
import { Link } from "wouter";
import { Item, palette } from "../../../../domain";
import { messages } from "../../../../messages";
import { useStore } from "../../store";
import "./ListItemRow.scss";

export interface ListItemProps {
  item: Item;
}

export const ListItemsRow: FC<ListItemProps> = ({ item }) => {
  const { actions } = useStore();
  return (
    <div className="ListItemsRow" data-testid={item.id.value}>
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
            <BsFillCartFill size={32} color={palette.purple} />
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
            <BsFillStarFill size={32} color={palette.yellow} />
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
