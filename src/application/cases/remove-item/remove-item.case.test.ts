import { describe, expect, it, vi } from "vitest";
import { Id } from "../../../domain";
import { ItemRepository } from "../../repositories";
import { RemoveItemCase } from "./remove-item.case";

describe("Remove item use case should", () => {
  it("remove an item successfully", async () => {
    const itemId = new Id();
    const itemRepository = {
      removeById: vi.fn(async (id) => {}),
    } as unknown as ItemRepository;

    await new RemoveItemCase(itemRepository).exec(itemId);

    expect(itemRepository.removeById).toHaveBeenCalledWith(itemId);
  });
});
