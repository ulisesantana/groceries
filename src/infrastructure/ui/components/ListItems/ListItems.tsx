import React, { FC } from "react";
import { Item, ItemList } from "../../../../domain";
import { messages } from "../../../../messages";
import { ListItemsRow } from "../ListItemsRow";
import "./ListItems.scss";

export interface ListProps {
  items: Item[];
}

const EmptyList = () => (
  <div className="ListItems">
    <p>{messages.itemList.empty}</p>
  </div>
);

export const ListItems: FC<ListProps> = ({ items }) => {
  if (items.length === 0) {
    return <EmptyList />;
  }
  return (
    <div className="ListItems">
      <span className="items-total">{messages.itemList.total(items)}</span>
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
