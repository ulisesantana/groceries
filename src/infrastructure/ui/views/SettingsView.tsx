import React from "react";
import { Transition } from "react-transition-group";
import { useRoute } from "wouter";
import { SettingsForm } from "../components";
import { routes } from "../routes";

export function SettingsView() {
  const [match] = useRoute(routes.settings);

  return (
    <Transition in={match} timeout={500}>
      <SettingsForm />
    </Transition>
  );
}
