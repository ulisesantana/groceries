import React from "react";
import { Transition } from "react-transition-group";
import { Link, useRoute } from "wouter";
import { messages } from "../../../../messages";
import { SettingsForm } from "../../components";
import { routes } from "../../routes";
import "./SettingsView.scss";

export function SettingsView() {
  const [match] = useRoute(routes.settings);
  const reload = () => {
    const url = new URL(
      window.location.href.replaceAll(window.location.pathname, "")
    );
    url.searchParams.set("reloadTime", Date.now().toString());
    window.location.href = url.toString();
  };
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
        <details open>
          <summary>Update</summary>
          <div className="center">
            <button onClick={reload}>Reload 🔄</button>
          </div>
        </details>
      </div>
    </Transition>
  );
}
