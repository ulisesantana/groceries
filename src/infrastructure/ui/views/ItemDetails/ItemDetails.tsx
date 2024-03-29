import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { useRoute } from "wouter";
import { Category, Id } from "../../../../domain";
import { messages } from "../../../../messages";
import { UpdateItemForm } from "../../components";
import { RemoveItemButton } from "../../components/RemoveItemButton/RemoveItemButton";
import { routes } from "../../routes";
import { useStore } from "../../store";
import "./ItemDetails.scss";

export function ItemDetails() {
  const [match, params] = useRoute(routes.items.detail);
  const { items, actions, categories } = useStore();
  const item = items.findById(new Id(params?.id));

  useEffect(() => {
    actions.getItems();
    actions.getCategories();
  }, [actions]);

  console.log(params, items.values.length, item);

  return (
    <Transition in={match} timeout={500}>
      <div className="ItemDetails" style={{ width: "100%" }}>
        {item !== undefined ? (
          <>
            <UpdateItemForm
              updateItemUseCase={actions.updateItem}
              categories={categories.values as Category[]}
              item={item}
            />
            {item && (
              <RemoveItemButton
                item={item}
                removeItemUseCase={actions.removeItem}
              />
            )}
          </>
        ) : (
          <span>{messages.itemForm.errors.itemDoesNotExist()}</span>
        )}
      </div>
    </Transition>
  );
}
