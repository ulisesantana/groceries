import React, { useEffect, useState } from "react";
import { Category } from "../../../../domain";
import { ActiveViewRepository } from "../../../repositories";
import { CreateItemForm, ListItems, Menu, Views } from "../../components";
import { Store, useStore } from "../../store";

export function Groceries() {
  const { items, actions, categories, categoriesVisibilityDictionary } =
    useStore() as Store;
  // TODO: test active view keep stored after page reload
  const activeView = ActiveViewRepository.read();
  const [lastSearch, setLastSearch] = useState("");
  const [view, setView] = useState(activeView);
  const setAndPersistView = (view: Views) => {
    ActiveViewRepository.write(view);
    setView(view);
  };

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
          onCollapseAll={actions.collapseAllCategories}
          onExpandAll={actions.expandAllCategories}
          categoriesVisibilityDictionary={categoriesVisibilityDictionary}
        />
      )}
      {view === Views.Required && (
        <ListItems
          items={items.search(lastSearch).getAllRequired()}
          onClick={actions.setCategoryVisibility}
          onCollapseAll={actions.collapseAllCategories}
          onExpandAll={actions.expandAllCategories}
          categoriesVisibilityDictionary={categoriesVisibilityDictionary}
        />
      )}
      {view === Views.Mandatory && (
        <ListItems
          items={items.search(lastSearch).getAllMandatory()}
          onClick={actions.setCategoryVisibility}
          onCollapseAll={actions.collapseAllCategories}
          onExpandAll={actions.expandAllCategories}
          categoriesVisibilityDictionary={categoriesVisibilityDictionary}
        />
      )}
      <Menu
        activeView={view}
        setView={setAndPersistView}
        onSearch={setLastSearch}
      />
    </>
  );
}
