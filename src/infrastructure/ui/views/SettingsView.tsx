import React from "react";
import { Transition } from "react-transition-group";
import { Link, useRoute } from "wouter";
import { messages } from "../../../messages";
import { SettingsForm } from "../components";
import { routes } from "../routes";

export function SettingsView() {
  const [match] = useRoute(routes.settings);

  return (
    <Transition in={match} timeout={500}>
      <>
        <Link to={routes.categories.list}>
          {messages.actions.goToCategories}
        </Link>
        <hr />
        <SettingsForm />
      </>
    </Transition>
  );
}
