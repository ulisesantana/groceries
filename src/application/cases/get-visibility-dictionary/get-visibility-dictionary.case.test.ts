import { describe, expect, it, vi } from "vitest";
import { VisibilityDictionary } from "../../../domain";
import { VisibilityDictionaryRepository } from "../../repositories";
import { GetVisibilityDictionaryCase } from "./get-visibility-dictionary.case";

describe("Get visibilityDictionary use case should", () => {
  it("return visibilityDictionary", async () => {
    const visibilityDictionary = new VisibilityDictionary();
    const visibilityDictionaryRepository = {
      read: vi.fn(async () => visibilityDictionary),
    } as unknown as VisibilityDictionaryRepository;

    const result = await new GetVisibilityDictionaryCase(
      visibilityDictionaryRepository
    ).exec();

    expect(visibilityDictionaryRepository.read).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(visibilityDictionary);
  });
});
