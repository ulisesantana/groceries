import { Id } from "../../../domain";
import { ItemRepository } from "../../repositories";
import { UseCase } from "../use-case";

type Input = Id;
type Output = Promise<void>;

export class RemoveItemCase implements UseCase<Input, Output> {
  constructor(private readonly itemRepository: ItemRepository) {}
  exec(id: Input): Output {
    return this.itemRepository.removeById(id);
  }
}
