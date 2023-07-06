import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { useRoute } from "wouter";
import { Category, Id } from "../../../domain";
import { UpdateItemForm } from "../components";
import { routes } from "../routes";
import { useStore } from "../store";

export function ItemDetails() {
  const [match, params] = useRoute(routes.items.detail);
  const { items, actions, categories } = useStore();
  const item = items.findById(new Id(params?.id));

  useEffect(() => {
    actions.getItems();
  }, [actions]);

  return (
    <Transition in={match} timeout={500}>
      <div className="ItemDetails" style={{ width: "100%" }}>
        {item ? (
          <UpdateItemForm
            updateItemUseCase={actions.updateItem}
            categories={categories.values as Category[]}
            item={item}
          />
        ) : (
          <span>Item not found.</span>
        )}
      </div>
    </Transition>
  );
}
