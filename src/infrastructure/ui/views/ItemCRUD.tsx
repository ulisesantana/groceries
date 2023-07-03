import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { useRoute } from "wouter";
import { Id } from "../../../domain";
import { routes } from "../routes";
import { useStore } from "../store";

export function ItemCRUD() {
  const [match, params] = useRoute(routes.items.detail);
  const { items, actions } = useStore();
  const item = items.findById(new Id(params?.id));

  useEffect(() => {
    actions.getItems();
  }, [actions]);

  return (
    <Transition in={match} timeout={500}>
      <div className="ItemCrud" style={{ width: "100%" }}>
        <span>Hi, this is: {params!.id}</span>
        <pre>
          <code>{JSON.stringify(item, null, 2)}</code>
        </pre>
      </div>
    </Transition>
  );
}
