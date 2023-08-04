import { VisibilityDictionary } from "../../domain";
import { UseCaseDouble } from "./use-case.double";

export class GetVisibilityDictionaryCaseDouble extends UseCaseDouble {
  constructor(onExec = [new VisibilityDictionary()]) {
    super(onExec);
  }
}
