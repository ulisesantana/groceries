import React, { FormEventHandler, useEffect } from "react";
import { messages } from "../../../../messages";
import { StoreActions, useStore } from "../../store";
import "./SettingsForm.scss";

export function SettingsForm() {
  const { actions, settings } = useStore();
  const onSubmitHandler = generateOnSubmitHandler(actions);

  useEffect(() => {
    actions.getSettings();
  }, [actions]);

  return (
    <form className="SettingsForm" onSubmit={onSubmitHandler}>
      <label htmlFor="syncUrl">{messages.settingsForm.syncUrlInputLabel}</label>
      <input
        name="syncUrl"
        type="url"
        aria-label={messages.settingsForm.syncUrlInput}
        placeholder={messages.settingsForm.syncUrlInput}
        defaultValue={settings?.syncUrl}
      />
      <button type="submit" aria-label={messages.settingsForm.submitButton}>
        {messages.settingsForm.submitButton} 💾
      </button>
    </form>
  );
}
function generateOnSubmitHandler(
  actions: StoreActions
): FormEventHandler<HTMLFormElement> {
  return (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    actions.setSettings({
      syncUrl: formData.get("syncUrl")!.toString(),
    });
  };
}
