import React from "react";
import { Transition } from "react-transition-group";
import { Link, useRoute } from "wouter";
import { messages } from "../../../../messages";
import version from "../../../../version";
import { SettingsForm, SyncUrlForm } from "../../components";
import { routes } from "../../routes";
import { useStore } from "../../store";
import "./SettingsView.scss";

export function SettingsView() {
  const [match] = useRoute(routes.settings);
  const { categories, items } = useStore();
  const reload = () => {
    const url = new URL(
      window.location.href.replaceAll(window.location.pathname, "")
    );
    url.searchParams.set("reloadTime", Date.now().toString());
    window.location.href = url.toString();
  };
  const backupDatabase = () => {
    downloadObjectAsJson(
      { categories: categories.toRaw(), items: items.toRaw() },
      `groceries.${new Date().toISOString().slice(0, 19)}.json`
    );
  };

  return (
    <Transition in={match} timeout={500}>
      <div className="SettingsView">
        <section>
          <h2>{messages.settings.categories}</h2>
          <div className="container">
            <Link to={routes.categories.create}>
              <button>{messages.actions.createACategory}</button>
            </Link>
            <Link to={routes.categories.list}>
              <button>{messages.actions.goToCategories}</button>
            </Link>
          </div>
        </section>
        <section>
          <h2>{messages.settings.dataSync}</h2>
          <div className="container">
            <SettingsForm />
            <button
              type="button"
              title={messages.settings.backupData}
              onClick={backupDatabase}
            >
              {messages.settings.backupData}
            </button>
            <SyncUrlForm />
          </div>
        </section>
        <section>
          <h2>{messages.settings.updateApp.title}</h2>
          <div className="container">
            <button onClick={reload}>{messages.settings.updateApp.CTA}</button>
          </div>
        </section>
        <section className="center">
          <span>version {version}</span>
        </section>
      </div>
    </Transition>
  );
}

function downloadObjectAsJson(obj: object, filename: string) {
  const dataStr = JSON.stringify(obj, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Create element and click it
  const downloadAnchor = document.createElement("a");
  downloadAnchor.href = url;
  downloadAnchor.download = filename;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();

  // Clean
  document.body.removeChild(downloadAnchor);
  URL.revokeObjectURL(url);
}
