import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { messages } from "../../../../messages";
import { SyncUrlForm } from "./SyncUrlForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Sync URL form should", () => {
  const writeTextMock = vi.fn(async () => {});
  Object.assign(navigator, {
    clipboard: {
      writeText: writeTextMock,
    },
  });

  beforeEach(() => {
    writeTextMock.mockClear();
  });

  it("renders correctly", () => {
    render(<SyncUrlForm />);
    expect(
      screen.getByLabelText(messages.settings.settingsConfigTextArea)
    ).toBeInTheDocument();
  });

  it("generates a sync URL when valid JSON is entered", () => {
    render(<SyncUrlForm />);

    // Simulate user typing valid JSON configuration
    const validConfig =
      '{"username":"user","password":"pass","host":"localhost","port":"8080"}';
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: validConfig },
    });

    // Expect the sync URL to be displayed
    expect(
      screen.getByText(/https:\/\/user:pass@localhost:8080/)
    ).toBeInTheDocument();
  });

  it("copies sync URL to clipboard and displays success message", async () => {
    render(<SyncUrlForm />);

    // Simulate user typing valid JSON configuration
    const validConfig =
      '{"username":"user","password":"pass","host":"localhost","port":"8080"}';
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: validConfig },
    });

    // Simulate user clicking the copy button
    await userEvent.click(
      screen.getByText(messages.settings.settingsConfigCopyButton)
    );

    // Expect writeText to have been called with the sync URL
    expect(writeTextMock).toHaveBeenCalledWith(
      "https://user:pass@localhost:8080"
    );

    // Expect success message to be displayed
    expect(
      screen.getByText(messages.settings.settingsConfigCopyFeedback)
    ).toHaveClass("success-box active");
  });
});
