import React, { FC, MouseEventHandler } from "react";
import { FiMaximize2, FiMinimize2 } from "react-icons/all";
import { Id, Item, ItemList, VisibilityDictionary } from "../../../../domain";
import { messages } from "../../../../messages";
import { Chevron } from "../Chevron";
import { ListItemsRow } from "../ListItemsRow";
import "./ListItems.scss";

export interface ListProps {
  items: Item[];
  categoriesVisibilityDictionary: VisibilityDictionary;
  onClick: (id: Id) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

const EmptyList = () => (
  <div className="ListItems">
    <p>{messages.itemList.empty}</p>
  </div>
);

export const ListItems: FC<ListProps> = ({
  items,
  categoriesVisibilityDictionary,
  onClick,
  onCollapseAll,
  onExpandAll,
}) => {
  const onClickHandler = (id: Id) => () => {
    onClick(id);
  };
  if (items.length === 0) {
    return <EmptyList />;
  }
  return (
    <div className="ListItems">
      <span className="items-total">
        <span></span>
        <span className="message">{messages.itemList.total(items.length)}</span>
        <span className="expand-and-collapse">
          <FiMaximize2
            aria-label={messages.itemList.expandAllCategories}
            onClick={onExpandAll}
          />
          <FiMinimize2
            aria-label={messages.itemList.collapseAllCategories}
            onClick={onCollapseAll}
          />
        </span>
      </span>
      {ItemList.groupItemsByCategory(items).map(([category, items]) => {
        const isOpen = categoriesVisibilityDictionary.get(category.id.value);
        const toggleVisibility = onClickHandler(
          category.id
        ) as unknown as MouseEventHandler<HTMLElement>;
        const goToCategoryDetails = () => {
          window.location.pathname = `/categories/details/${category.id.value}`;
        };
        return (
          <div className="category-container" key={category.id.value}>
            <button
              aria-label={category.title}
              onClick={toggleVisibility}
              onDoubleClick={goToCategoryDetails}
              style={{ borderBottom: `solid 0.35rem ${category.color}` }}
            >
              <span>{category.icon}</span>
              <span>
                {category.name} <i>({items.length})</i>
              </span>
              <span>
                <Chevron flip={isOpen} />
              </span>
            </button>
            <ul className={isOpen ? "" : "hidden"}>
              {items.map((item) => (
                <li data-testid="list-item-row" key={item.id.value}>
                  <ListItemsRow item={item} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
