import { UseCase } from "../use-case";
import { VisibilityDictionary } from "../../../domain";
import { VisibilityDictionaryRepository } from "../../repositories";

export class SetVisibilityDictionaryCase
  implements UseCase<VisibilityDictionary, Promise<void>>
{
  constructor(private readonly repository: VisibilityDictionaryRepository) {}
  exec(dictionary: VisibilityDictionary): Promise<void> {
    return this.repository.save(dictionary);
  }
}
