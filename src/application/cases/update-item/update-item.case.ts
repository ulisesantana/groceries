import { UseCase } from "../use-case";
import { Item, ItemNotFoundError } from "../../../domain";
import { ItemRepository } from "../../repositories";

type Input = Item;
type Output = Promise<Item>;

export class UpdateItemCase implements UseCase<Input, Output> {
  constructor(private readonly itemsRepository: ItemRepository) {}
  async exec(item: Input): Output {
    const items = await this.itemsRepository.findAll();
    if (!items.has(item)) {
      throw new ItemNotFoundError(item.id);
    }
    return this.itemsRepository.save(item);
  }
}
