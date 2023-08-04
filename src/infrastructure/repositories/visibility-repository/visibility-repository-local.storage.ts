import { VisibilityDictionaryRepository } from "../../../application/";
import { RawVisibilityDictionary, VisibilityDictionary } from "../../../domain";
import { LocalStorageDataSource } from "../../data-sources";

export class VisibilityRepositoryLocalStorage
  implements VisibilityDictionaryRepository
{
  constructor(
    private readonly localStorage: LocalStorageDataSource<RawVisibilityDictionary>
  ) {}

  async read() {
    const raw = this.localStorage.get() ?? {};
    return new VisibilityDictionary(raw);
  }

  async save(dictionary: VisibilityDictionary) {
    this.localStorage.set(dictionary.values);
  }
}
