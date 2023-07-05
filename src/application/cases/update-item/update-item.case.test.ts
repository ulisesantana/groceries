import { describe, expect, it, vi } from "vitest";
import { Item, ItemList, ItemNotFoundError } from "../../../domain";
import { ItemBuilder } from "../../../tests/builders";
import { ItemRepository } from "../../repositories";
import { UpdateItemCase } from "./update-item.case";

describe("Update item use case should", () => {
  it("update an item successfully", async () => {
    const item = ItemBuilder.random();
    const update = ItemBuilder.clone(item)
      .withName("Irrelevant item name")
      .build();
    const itemRepository = {
      findAll: vi.fn(async () => new ItemList([item])),
      save: vi.fn(async (item: Item) => item),
    } as unknown as ItemRepository;

    const savedItem = await new UpdateItemCase(itemRepository).exec(update);

    expect(savedItem).toEqual(update);
    expect(itemRepository.save).toHaveBeenCalled();
  });

  it("throw ItemNotFoundError if item does not exist", async () => {
    const item = ItemBuilder.random();
    const itemRepository = {
      findAll: vi.fn(async () => new ItemList([ItemBuilder.random()])),
      save: vi.fn(async () => {}),
    } as unknown as ItemRepository;

    await expect(new UpdateItemCase(itemRepository).exec(item)).rejects.toThrow(
      new ItemNotFoundError(item.id)
    );
    expect(itemRepository.save).not.toHaveBeenCalled();
  });
});
