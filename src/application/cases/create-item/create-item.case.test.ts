import { describe, expect, it, vi } from "vitest";
import { ItemList } from "../../../domain";
import { ItemBuilder } from "../../../tests/builders";
import { ItemRepository } from "../../repositories";
import { CreateItemCase } from "./create-item.case";

describe("Create item use case should", () => {
  it("create a item successfully", async () => {
    const item = ItemBuilder.init().build();
    const itemRepository = {
      findAll: vi.fn(async () => new ItemList([])),
      save: vi.fn(async (item) => item),
    } as unknown as ItemRepository;

    const createdItem = await new CreateItemCase(itemRepository).exec(item);

    expect(createdItem).toEqual(item);
    expect(itemRepository.save).toHaveBeenCalledWith(item);
  });
});
