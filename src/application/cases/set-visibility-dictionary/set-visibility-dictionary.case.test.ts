import { describe, expect, it, vi } from "vitest";
import { VisibilityDictionary } from "../../../domain";
import { VisibilityDictionaryRepository } from "../../repositories";
import { SetVisibilityDictionaryCase } from "./set-visibility-dictionary.case";

describe("Set visibility dictionary use case should", () => {
  it("save dictionary", async () => {
    const dictionary = new VisibilityDictionary();
    const repository = {
      save: vi.fn(async () => {}),
    } as unknown as VisibilityDictionaryRepository;

    await new SetVisibilityDictionaryCase(repository).exec(dictionary);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(dictionary);
  });
});
