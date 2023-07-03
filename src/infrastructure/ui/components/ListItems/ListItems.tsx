import React, { FC } from "react";
import { Item, ItemList } from "../../../../domain";
import { ListItemsRow } from "../ListItemsRow";
import "./ListItems.scss";
import { messages } from "../../../../messages";

export interface ListProps {
  items: Item[];
}

const EmptyList = () => (
  <div className="ListItems">
    <p>{messages.emptyList}</p>
  </div>
);

export const ListItems: FC<ListProps> = ({ items }) => {
  if (items.length === 0) {
    return <EmptyList />;
  }
  return (
    <div className="ListItems">
      <span className="items-total">
        {items.length === 1 ? "1 item" : `${items.length} items`}
      </span>
      {ItemList.groupItemsByCategory(items).map(([categoryTitle, items]) => (
        <details open key={categoryTitle}>
          <summary>{categoryTitle}</summary>
          <ul>
            {items.map((item) => (
              <li key={item.id.value}>
                <ListItemsRow item={item} />
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
};
