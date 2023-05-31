import { UseCase } from "../use-case";
import { Item } from "../../../domain";
import { ItemRepository } from "../../repositories";

type Input = Item;
type Output = Promise<Item>;

export class SaveItemCase implements UseCase<Input, Output> {
  constructor(private readonly itemsRepository: ItemRepository) {}
  exec(item: Input): Output {
    return this.itemsRepository.save(item);
  }
}
