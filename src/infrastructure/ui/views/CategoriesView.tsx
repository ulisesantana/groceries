import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { Link, useRoute } from "wouter";
import { Category } from "../../../domain";
import { messages } from "../../../messages";
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
      <>
        <Link to={routes.categories.create}>
          {messages.actions.createACategory}
        </Link>
        <ListCategories categories={categories.values as Category[]} />
      </>
    </Transition>
  );
}
