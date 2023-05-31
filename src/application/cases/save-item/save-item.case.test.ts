import { describe, expect, it, vi } from "vitest";
import { ItemBuilder } from "../../../tests/builders";
import { ItemRepository } from "../../repositories";
import { SaveItemCase } from "./save-item.case";

describe("Save item use case should", () => {
  it("save an item successfully", async () => {
    const item = ItemBuilder.init().build();
    const itemsRepository = {
      save: vi.fn(() => item),
    } as unknown as ItemRepository;

    const savedItem = await new SaveItemCase(itemsRepository).exec(item);

    expect(savedItem).toEqual(item);
  });
});
