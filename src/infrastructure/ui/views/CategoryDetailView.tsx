import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { useRoute } from "wouter";
import { Id } from "../../../domain";
import { UpdateCategoryForm } from "../components";
import { routes } from "../routes";
import { useStore } from "../store";

export function CategoryDetailView() {
  const [match, params] = useRoute(routes.categories.detail);
  const { categories, actions } = useStore();
  const category = categories.findById(new Id(params?.id));

  useEffect(() => {
    actions.getCategories();
  }, [actions]);

  return (
    <Transition in={match} timeout={500}>
      <div className="ItemCrud" style={{ width: "100%" }}>
        <span>Hi, this is: {params!.id}</span>
        <pre>
          <code>{JSON.stringify(category, null, 2)}</code>
        </pre>
        <UpdateCategoryForm category={category!} />
      </div>
    </Transition>
  );
}
