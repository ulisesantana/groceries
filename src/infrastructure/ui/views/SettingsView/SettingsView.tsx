import React from "react";
import { Transition } from "react-transition-group";
import { Link, useRoute } from "wouter";
import { messages } from "../../../../messages";
import version from "../../../../version";
import { SettingsForm } from "../../components";
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
          <button onClick={backupDatabase}>Backup database ⬇️</button>
        </details>
        <details open>
          <summary>Update</summary>
          <div className="center">
            <button onClick={reload}>Reload 🔄</button>
          </div>
        </details>
        <div className="center">
          <span>version {version}</span>
        </div>
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
