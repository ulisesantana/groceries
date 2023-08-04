import React, { useEffect, useState } from "react";
import { Category } from "../../../../domain";
import { CreateItemForm, ListItems, Menu, Views } from "../../components";
import { Store, useStore } from "../../store";

export function Groceries() {
  const { items, actions, categories, categoriesVisibilityDictionary } =
    useStore() as Store;
  const [lastSearch, setLastSearch] = useState("");
  const [view, setView] = useState(Views.All);

  useEffect(() => {
    actions.getItems();
    actions.getCategories();
    actions.getCategoryVisibilityDictionary();
  }, [actions, view]);

  return (
    <>
      {view === Views.CreateItem && (
        <CreateItemForm
          categories={categories.values as Category[]}
          createItemUseCase={actions.createItem}
        />
      )}
      {view === Views.All && (
        <ListItems
          items={items.search(lastSearch).values}
          onClick={actions.setCategoryVisibility}
          categoriesVisibilityDictionary={categoriesVisibilityDictionary}
        />
      )}
      {view === Views.Required && (
        <ListItems
          items={items.search(lastSearch).getAllRequired()}
          onClick={actions.setCategoryVisibility}
          categoriesVisibilityDictionary={categoriesVisibilityDictionary}
        />
      )}
      {view === Views.Mandatory && (
        <ListItems
          items={items.search(lastSearch).getAllMandatory()}
          onClick={actions.setCategoryVisibility}
          categoriesVisibilityDictionary={categoriesVisibilityDictionary}
        />
      )}
      <Menu activeView={view} setView={setView} onSearch={setLastSearch} />
    </>
  );
}
