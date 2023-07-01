import { describe, expect, it, vi } from "vitest";
import { ItemRepository } from "../../repositories";
import { ItemList } from "../../../domain";
import { ItemBuilder } from "../../../tests/builders";
import { GetItemsCase } from "./get-items.case";

describe("Get items use case should", () => {
  it("return all items", async () => {
    const items = new ItemList([ItemBuilder.random(), ItemBuilder.random()]);
    const itemsRepository = {
      findAll: vi.fn(async () => items),
    } as unknown as ItemRepository;

    const result = await new GetItemsCase(itemsRepository).exec();

    expect(itemsRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(items);
  });
});
