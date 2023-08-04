import { UseCase } from "../use-case";
import { VisibilityDictionary } from "../../../domain";
import { VisibilityDictionaryRepository } from "../../repositories";

export class GetVisibilityDictionaryCase
  implements UseCase<void, Promise<VisibilityDictionary>>
{
  constructor(private readonly repository: VisibilityDictionaryRepository) {}
  exec(): Promise<VisibilityDictionary> {
    return this.repository.read();
  }
}
