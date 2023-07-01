import {
  CreateCategoryCase,
  GetCategoriesCase,
  GetItemsCase,
  GetSettingsCase,
  SaveItemCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  SetSettingsCase,
  UseCases,
} from "../../application";
import { GetCategoriesCaseDouble, GetItemsCaseDouble } from "../doubles";
import { UseCaseDouble } from "../doubles/use-case.double";
import { SettingsBuilder } from "./settings-builder";

type ValueOf<T> = T[keyof T];

export class UseCasesBuilder {
  private createCategory: CreateCategoryCase;
  private getCategories: GetCategoriesCase;
  private getItems: GetItemsCase;
  private getSettings: GetSettingsCase;
  private saveItem: SaveItemCase;
  private setItemAsRequired: SetItemAsRequiredCase;
  private setItemAsNotRequired: SetItemAsNotRequiredCase;
  private setItemAsMandatory: SetItemAsMandatoryCase;
  private setItemAsNotMandatory: SetItemAsNotMandatoryCase;
  private setSettings: SetSettingsCase;

  private constructor({
    createCategory,
    getCategories,
    getItems,
    getSettings,
    saveItem,
    setItemAsRequired,
    setItemAsNotRequired,
    setItemAsNotMandatory,
    setItemAsMandatory,
    setSettings,
  }: Partial<Record<keyof UseCases, ValueOf<UseCases>>> = {}) {
    this.createCategory = (createCategory ||
      new UseCaseDouble()) as CreateCategoryCase;
    this.getCategories = (getCategories ||
      new GetCategoriesCaseDouble()) as GetCategoriesCase;
    this.getItems = (getItems || new GetItemsCaseDouble()) as GetItemsCase;
    this.getSettings = (getSettings ||
      new UseCaseDouble([
        SettingsBuilder.init().withSyncUrl(undefined).build(),
      ])) as GetSettingsCase;
    this.saveItem = (saveItem || new UseCaseDouble()) as SaveItemCase;
    this.setItemAsRequired = (setItemAsRequired ||
      new UseCaseDouble()) as SetItemAsRequiredCase;
    this.setItemAsNotRequired = (setItemAsNotRequired ||
      new UseCaseDouble()) as SetItemAsNotRequiredCase;
    this.setItemAsMandatory = (setItemAsMandatory ||
      new UseCaseDouble()) as SetItemAsMandatoryCase;
    this.setItemAsNotMandatory = (setItemAsNotMandatory ||
      new UseCaseDouble()) as SetItemAsNotMandatoryCase;
    this.setSettings = (setSettings || new UseCaseDouble()) as SetSettingsCase;
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

  withGetItemsCase(getItems: GetItemsCase | UseCaseDouble): UseCasesBuilder {
    this.getItems = getItems as GetItemsCase;
    return this;
  }

  withSaveItemCase(saveItem: SaveItemCase | UseCaseDouble): UseCasesBuilder {
    this.saveItem = saveItem as SaveItemCase;
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

  build(): UseCases {
    return {
      createCategory: this.createCategory,
      getCategories: this.getCategories,
      getItems: this.getItems,
      getSettings: this.getSettings,
      saveItem: this.saveItem,
      setItemAsRequired: this.setItemAsRequired,
      setItemAsNotRequired: this.setItemAsNotRequired,
      setItemAsMandatory: this.setItemAsMandatory,
      setItemAsNotMandatory: this.setItemAsNotMandatory,
      setSettings: this.setSettings,
    };
  }
}
