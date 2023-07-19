import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, it } from "vitest";
import { messages } from "../../../../messages";
import { UseCasesBuilder } from "../../../../tests/builders/use-cases-builder";
import { UseCaseDouble } from "../../../../tests/doubles/use-case.double";
import { initStore } from "../../store";
import { SettingsForm } from "./SettingsForm";

describe("Settings form should", () => {
  it("edit database sync url", async () => {
    const expectedSyncUrl = "https://irrelevant.info";
    const setSettingsDouble = new UseCaseDouble();
    await waitFor(() =>
      initStore(
        UseCasesBuilder.init().withSetSettingsCase(setSettingsDouble).build()
      )
    );
    render(<SettingsForm />);

    await userEvent.type(
      screen.getByLabelText(messages.settingsForm.syncUrlInput),
      expectedSyncUrl
    );
    await userEvent.click(
      screen.getByLabelText(messages.settingsForm.submitButton)
    );

    await waitFor(() =>
      setSettingsDouble.assertHasBeenCalledWith({ syncUrl: expectedSyncUrl })
    );
  });
});
