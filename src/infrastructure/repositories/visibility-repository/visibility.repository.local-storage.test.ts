import { describe, expect, it } from "vitest";
import {
  RawVisibilityDictionary,
  Settings,
  VisibilityDictionary,
} from "../../../domain";
import { LocalStorageDouble } from "../../../tests/doubles";
import { VisibilityRepositoryLocalStorage } from "./visibility-repository-local.storage";

describe("Local Storage implementation for visibility repository should", () => {
  let localStorage: LocalStorageDouble<RawVisibilityDictionary>;
  const rawVisibilityDictionary: RawVisibilityDictionary = {
    a: true,
    b: false,
  };
  const expectedDictionary = new VisibilityDictionary(rawVisibilityDictionary);

  beforeEach(() => {
    localStorage = new LocalStorageDouble<RawVisibilityDictionary>({
      onGet: rawVisibilityDictionary,
    });
  });

  it("retrieve category visibility dictionary", async () => {
    const result = await new VisibilityRepositoryLocalStorage(
      localStorage
    ).read();

    expect(result.values).toStrictEqual(expectedDictionary.values);
    localStorage.assertGetHasBeenCalled();
  });

  it("save rawVisibilityDictionary", async () => {
    await new VisibilityRepositoryLocalStorage(localStorage).save(
      expectedDictionary
    );

    localStorage.assertSetHasBeenCalledWith(rawVisibilityDictionary);
  });
});
