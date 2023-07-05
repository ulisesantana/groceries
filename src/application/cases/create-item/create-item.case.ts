import { Item } from "../../../domain";
import { ItemRepository } from "../../repositories";
import { UseCase } from "../use-case";

type Input = Item;
type Output = Promise<Item>;

export class CreateItemCase implements UseCase<Input, Output> {
  constructor(private readonly itemRepository: ItemRepository) {}
  exec(item: Input): Output {
    return this.itemRepository.save(item);
  }
}
