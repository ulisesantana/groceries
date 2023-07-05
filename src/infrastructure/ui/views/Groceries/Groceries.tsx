import React, { useEffect, useState } from "react";
import { Category } from "../../../../domain";
import { CreateItemForm, ListItems, Menu, Views } from "../../components";
import { useStore } from "../../store";

export function Groceries() {
  const { items, actions, categories } = useStore();
  const [lastSearch, setLastSearch] = useState("");
  const [view, setView] = useState(Views.All);

  useEffect(() => {
    actions.getItems();
    actions.getCategories();
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
        <ListItems items={items.search(lastSearch).values} />
      )}
      {view === Views.Required && (
        <ListItems items={items.search(lastSearch).getAllRequired()} />
      )}
      {view === Views.Mandatory && (
        <ListItems items={items.search(lastSearch).getAllMandatory()} />
      )}
      <Menu activeView={view} setView={setView} onSearch={setLastSearch} />
    </>
  );
}
