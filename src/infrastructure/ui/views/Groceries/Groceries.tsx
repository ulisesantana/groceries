import React, { useEffect, useState } from "react";
import { CreateCategoryForm, ListItems, Menu, Views } from "../../components";
import { useStore } from "../../store";

export function Groceries() {
  const { items, actions } = useStore();
  const [lastSearch, setLastSearch] = useState("");
  const [view, setView] = useState(Views.All);

  useEffect(() => {
    actions.getItems();
  }, [actions, view]);

  return (
    <>
      {view === Views.CreateItem && <CreateCategoryForm />}
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
