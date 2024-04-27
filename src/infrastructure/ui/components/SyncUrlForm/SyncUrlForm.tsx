import React, { ChangeEventHandler, useState } from "react";
import { messages } from "../../../../messages";
import "./SyncUrlForm.scss";
import classNames from "classnames";

export function SyncUrlForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [syncDataUrl, setSyncDataUrl] = useState("");
  const generateSyncUrl: ChangeEventHandler<HTMLTextAreaElement> = ({
    currentTarget,
  }) => {
    if (currentTarget.value) {
      const config = JSON.parse(currentTarget.value);
      if (config.username && config.password && config.host && config.port) {
        setSyncDataUrl(getDbUrl(config));
      }
    }
  };
  const copySyncUrl = () => {
    navigator.clipboard.writeText(syncDataUrl).then(() => {
      setSuccessMessage(messages.settings.settingsConfigCopyFeedback);
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    });
  };
  return (
    <form className="SyncUrlForm">
      <label htmlFor="syncConfig">
        {messages.settings.settingsConfigTextArea}
      </label>
      <textarea id="syncConfig" onChange={generateSyncUrl} />
      {syncDataUrl && (
        <>
          <span
            className={classNames("success-box", { active: successMessage })}
          >
            {messages.settings.settingsConfigCopyFeedback}
          </span>
          <span>
            {messages.settings.settingsConfigUrl}: {syncDataUrl}
          </span>
          <button type={"button"} onClick={copySyncUrl}>
            {messages.settings.settingsConfigCopyButton}
          </button>
        </>
      )}
    </form>
  );
}

function getDbUrl({ username, password, host, port }: Record<string, string>) {
  return `https://${username}:${password}@${host}:${port}`;
}
