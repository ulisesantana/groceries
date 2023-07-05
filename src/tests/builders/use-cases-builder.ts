import {
  CreateCategoryCase,
  GetCategoriesCase,
  GetItemsCase,
  GetSettingsCase,
  UpdateItemCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  SetSettingsCase,
  UpdateCategoryCase,
  UseCases,
  CreateItemCase,
} from "../../application";
import { GetCategoriesCaseDouble, GetItemsCaseDouble } from "../doubles";
import { UseCaseDouble } from "../doubles/use-case.double";
import { SettingsBuilder } from "./settings-builder";

type ValueOf<T> = T[keyof T];

export class UseCasesBuilder {
  private createCategory: CreateCategoryCase;
  private createItem: CreateItemCase;
  private getCategories: GetCategoriesCase;
  private getItems: GetItemsCase;
  private getSettings: GetSettingsCase;
  private updateItem: UpdateItemCase;
  private setItemAsRequired: SetItemAsRequiredCase;
  private setItemAsNotRequired: SetItemAsNotRequiredCase;
  private setItemAsMandatory: SetItemAsMandatoryCase;
  private setItemAsNotMandatory: SetItemAsNotMandatoryCase;
  private setSettings: SetSettingsCase;
  private updateCategory: UpdateCategoryCase;

  private constructor({
    createCategory,
    createItem,
    getCategories,
    getItems,
    getSettings,
    updateItem,
    setItemAsRequired,
    setItemAsNotRequired,
    setItemAsNotMandatory,
    setItemAsMandatory,
    setSettings,
    updateCategory,
  }: Partial<Record<keyof UseCases, ValueOf<UseCases>>> = {}) {
    this.createCategory = (createCategory ||
      new UseCaseDouble()) as CreateCategoryCase;
    this.createItem = (createItem || new UseCaseDouble()) as CreateItemCase;
    this.getCategories = (getCategories ||
      new GetCategoriesCaseDouble()) as GetCategoriesCase;
    this.getItems = (getItems || new GetItemsCaseDouble()) as GetItemsCase;
    this.getSettings = (getSettings ||
      new UseCaseDouble([
        SettingsBuilder.init().withSyncUrl(undefined).build(),
      ])) as GetSettingsCase;
    this.updateItem = (updateItem || new UseCaseDouble()) as UpdateItemCase;
    this.setItemAsRequired = (setItemAsRequired ||
      new UseCaseDouble()) as SetItemAsRequiredCase;
    this.setItemAsNotRequired = (setItemAsNotRequired ||
      new UseCaseDouble()) as SetItemAsNotRequiredCase;
    this.setItemAsMandatory = (setItemAsMandatory ||
      new UseCaseDouble()) as SetItemAsMandatoryCase;
    this.setItemAsNotMandatory = (setItemAsNotMandatory ||
      new UseCaseDouble()) as SetItemAsNotMandatoryCase;
    this.setSettings = (setSettings || new UseCaseDouble()) as SetSettingsCase;
    this.updateCategory = (updateCategory ||
      new UseCaseDouble()) as UpdateCategoryCase;
  }

  static init(): UseCasesBuilder {
    return new UseCasesBuilder();
  }

  static random(): UseCases {
    return new UseCasesBuilder().build();
  }

  withCreateCategoryCase(
    createCategory: CreateCategoryCase | UseCaseDouble
  ): UseCasesBuilder {
    this.createCategory = createCategory as CreateCategoryCase;
    return this;
  }

  withCreateItemCase(createItem: CreateItemCase | UseCaseDouble) {
    this.createItem = createItem as CreateItemCase;
    return this;
  }

  withGetItemsCase(getItems: GetItemsCase | UseCaseDouble): UseCasesBuilder {
    this.getItems = getItems as GetItemsCase;
    return this;
  }

  withGetCategoriesCase(
    getCategories: GetCategoriesCase | UseCaseDouble
  ): UseCasesBuilder {
    this.getCategories = getCategories as GetCategoriesCase;
    return this;
  }

  withUpdateItemCase(
    updateItem: UpdateItemCase | UseCaseDouble
  ): UseCasesBuilder {
    this.updateItem = updateItem as UpdateItemCase;
    return this;
  }

  withSetItemAsRequiredCase(
    setItemAsRequired: SetItemAsRequiredCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsRequired = setItemAsRequired as SetItemAsRequiredCase;
    return this;
  }

  withSetItemAsNotRequiredCase(
    setItemAsNotRequired: SetItemAsNotRequiredCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsNotRequired =
      setItemAsNotRequired as SetItemAsNotRequiredCase;
    return this;
  }

  withSetItemAsMandatoryCase(
    setItemAsMandatory: SetItemAsMandatoryCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsMandatory = setItemAsMandatory as SetItemAsMandatoryCase;
    return this;
  }

  withSetItemAsNotMandatoryCase(
    setItemAsNotMandatory: SetItemAsNotMandatoryCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsNotMandatory =
      setItemAsNotMandatory as SetItemAsNotMandatoryCase;
    return this;
  }

  withSetSettingsCase(
    setSettings: SetSettingsCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setSettings = setSettings as SetSettingsCase;
    return this;
  }

  withUpdateCategoryCase(updateCategory: UpdateCategoryCase | UseCaseDouble) {
    this.updateCategory = updateCategory as UpdateCategoryCase;
    return this;
  }

  build(): UseCases {
    return {
      createCategory: this.createCategory,
      createItem: this.createItem,
      getCategories: this.getCategories,
      getItems: this.getItems,
      getSettings: this.getSettings,
      setItemAsRequired: this.setItemAsRequired,
      setItemAsNotRequired: this.setItemAsNotRequired,
      setItemAsMandatory: this.setItemAsMandatory,
      setItemAsNotMandatory: this.setItemAsNotMandatory,
      setSettings: this.setSettings,
      updateCategory: this.updateCategory,
      updateItem: this.updateItem,
    };
  }
}
