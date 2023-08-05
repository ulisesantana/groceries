import React, { FC, useCallback, useState } from "react";
import "./Menu.scss";
import { BsFillCartFill, BsSearch, FaExclamation } from "react-icons/all";
import { FiList, FiPlus } from "react-icons/fi";
import { palette } from "../../../../domain";
import { Search } from "../Search";
import { messages } from "../../../../messages";
import classNames from "classnames";

export enum Views {
  All,
  Required,
  Mandatory,
  CreateItem,
}

export interface MenuProps {
  setView: (view: Views) => void;
  activeView: Views;
  onSearch: (search: string) => void;
}

export const Menu: FC<MenuProps> = ({ setView, activeView, onSearch }) => {
  const [search, setSearch] = useState(false);
  const onClose = useCallback(() => setSearch(false), [setSearch]);
  const isActive = (view: Views) => view === activeView;
  const getBackgroundColor = (view: Views) =>
    isActive(view) ? palette.yellow : "transparent";
  const getTextColor = (view: Views) =>
    isActive(view) ? palette.purple : "inherit";
  return (
    <nav className="Menu">
      <div className={classNames("flip-container", { active: search })}>
        {search ? (
          <div className={classNames("flip-back", { active: search })}>
            <Search onChange={onSearch} onClose={onClose} />
          </div>
        ) : (
          <ul
            style={{ backgroundColor: palette.purple, color: palette.white }}
            className={classNames("flip-front", { active: !search })}
          >
            <li
              style={{
                backgroundColor: getBackgroundColor(Views.CreateItem),
                color: getTextColor(Views.CreateItem),
              }}
            >
              <button
                aria-label={messages.menu.createItem}
                onClick={() => setView(Views.CreateItem)}
              >
                <FiPlus />
              </button>
            </li>
            <li
              style={{
                backgroundColor: getBackgroundColor(Views.All),
                color: getTextColor(Views.All),
              }}
            >
              <button
                aria-label={messages.menu.allItemsListCTA}
                onClick={() => setView(Views.All)}
              >
                <FiList />
              </button>
            </li>
            <li
              style={{
                backgroundColor: getBackgroundColor(Views.Required),
                color: getTextColor(Views.Required),
              }}
            >
              <button
                aria-label={messages.menu.requiredListCTA}
                onClick={() => setView(Views.Required)}
              >
                <BsFillCartFill />
              </button>
            </li>
            <li
              style={{
                backgroundColor: getBackgroundColor(Views.Mandatory),
                color: getTextColor(Views.Mandatory),
              }}
            >
              <button
                aria-label={messages.menu.mandatoryListCTA}
                onClick={() => setView(Views.Mandatory)}
              >
                <FaExclamation />
              </button>
            </li>
            <li>
              <button
                aria-label={messages.menu.searchCTA}
                onClick={() => setSearch(true)}
              >
                <BsSearch />
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
