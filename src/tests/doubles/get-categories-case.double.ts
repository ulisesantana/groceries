import { CategoryList } from "../../domain";
import { CategoryBuilder } from "../builders";
import { UseCaseDouble } from "./use-case.double";

export class GetCategoriesCaseDouble extends UseCaseDouble {
  constructor(
    onExec = [
      new CategoryList(Array.from({ length: 3 }).map(CategoryBuilder.random)),
    ]
  ) {
    super(onExec);
  }
}
