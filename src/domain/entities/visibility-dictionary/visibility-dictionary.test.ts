import { describe, it, expect, beforeEach } from "vitest";
import {
  VisibilityDictionary,
  RawVisibilityDictionary,
} from "./visibility-dictionary";

describe("VisibilityDictionary should", () => {
  let visibilityDict: VisibilityDictionary;

  beforeEach(() => {
    visibilityDict = new VisibilityDictionary();
  });

  it("initialize with an empty dictionary", () => {
    expect(visibilityDict.values).toEqual({});
  });

  it("clone the dictionary with the same values", () => {
    const initialValues: RawVisibilityDictionary = { key1: true, key2: false };
    visibilityDict = new VisibilityDictionary(initialValues);
    const clone = visibilityDict.clone();
    expect(clone.values).toEqual(initialValues);
  });

  it("get a value", () => {
    visibilityDict.set("key", true);
    expect(visibilityDict.get("key")).toBeTruthy();
  });

  it("return false for an undefined key", () => {
    expect(visibilityDict.get("undefinedKey")).toBeFalsy();
  });

  it("set a value", () => {
    visibilityDict.set("key", true);
    expect(visibilityDict.values).toEqual({ key: true });
  });

  it("toggle an existing key", () => {
    visibilityDict.set("key", true);
    visibilityDict.toggle("key");
    expect(visibilityDict.get("key")).toBeFalsy();
  });

  it("toggle an undefined key", () => {
    visibilityDict.toggle("undefinedKey");
    expect(visibilityDict.get("undefinedKey")).toBeTruthy();
  });

  it("check if a key exists", () => {
    visibilityDict.set("key", true);
    expect(visibilityDict.has("key")).toBeTruthy();
    expect(visibilityDict.has("undefinedKey")).toBeFalsy();
  });

  it("not allow mutation of internal state via constructor", () => {
    const initialValues: RawVisibilityDictionary = { key1: true };
    visibilityDict = new VisibilityDictionary(initialValues);
    initialValues.key1 = false;
    expect(visibilityDict.get("key1")).toBeTruthy();
  });
});
