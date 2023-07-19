import React from "react";
import { Transition } from "react-transition-group";
import { Link, useRoute } from "wouter";
import { messages } from "../../../../messages";
import { SettingsForm } from "../../components";
import { routes } from "../../routes";
import "./SettingsView.scss";

export function SettingsView() {
  const [match] = useRoute(routes.settings);

  return (
    <Transition in={match} timeout={500}>
      <div className="SettingsView">
        <details open>
          <summary>{messages.settings.categories}</summary>
          <ul>
            <li>
              <Link to={routes.categories.create}>
                {messages.actions.createACategory}
              </Link>
            </li>
            <li>
              <Link to={routes.categories.list}>
                {messages.actions.goToCategories}
              </Link>
            </li>
          </ul>
        </details>
        <details open>
          <summary>{messages.settings.dataSync}</summary>
          <SettingsForm />
        </details>
      </div>
    </Transition>
  );
}
