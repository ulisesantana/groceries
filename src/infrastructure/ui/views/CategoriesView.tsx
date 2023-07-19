import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { useRoute } from "wouter";
import { Category } from "../../../domain";
import { ListCategories } from "../components/ListCategories/ListCategories";
import { routes } from "../routes";
import { useStore } from "../store";

export function CategoriesView() {
  const [match] = useRoute(routes.categories.list);
  const { categories, actions } = useStore();

  useEffect(() => {
    actions.getCategories();
  }, [actions]);

  return (
    <Transition in={match} timeout={500}>
      <ListCategories categories={categories.values as Category[]} />
    </Transition>
  );
}
