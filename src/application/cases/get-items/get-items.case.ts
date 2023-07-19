import { UseCase } from "../use-case";
import { ItemList } from "../../../domain";
import { ItemRepository } from "../../repositories";

export class GetItemsCase implements UseCase<void, Promise<ItemList>> {
  constructor(private readonly itemsRepository: ItemRepository) {}
  exec(): Promise<ItemList> {
    return this.itemsRepository.findAll();
  }
}
