import { VisibilityDictionary } from "../../domain";

export interface VisibilityDictionaryRepository {
  read(): Promise<VisibilityDictionary>;

  save(dictionary: VisibilityDictionary): Promise<void>;
}
