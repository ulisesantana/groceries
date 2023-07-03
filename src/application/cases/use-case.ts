import {
  CategoryRepository,
  ItemRepository,
  SettingsRepository,
} from "../repositories";
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
  UpdateCategoryCase,
} from "./index";

export interface UseCase<Input, Output> {
  exec(input: Input): Output;
}

export interface UseCases {
  createCategory: CreateCategoryCase;
  getCategories: GetCategoriesCase;
  getItems: GetItemsCase;
  getSettings: GetSettingsCase;
  saveItem: SaveItemCase;
  setItemAsRequired: SetItemAsRequiredCase;
  setItemAsNotRequired: SetItemAsNotRequiredCase;
  setItemAsMandatory: SetItemAsMandatoryCase;
  setItemAsNotMandatory: SetItemAsNotMandatoryCase;
  setSettings: SetSettingsCase;
  updateCategory: UpdateCategoryCase;
}

interface Repositories {
  categoryRepository: CategoryRepository;
  itemRepository: ItemRepository;
  settingsRepository: SettingsRepository;
}

export function generateUseCases({
  categoryRepository,
  itemRepository,
  settingsRepository,
}: Repositories): UseCases {
  return {
    createCategory: new CreateCategoryCase(categoryRepository),
    getCategories: new GetCategoriesCase(categoryRepository),
    getItems: new GetItemsCase(itemRepository),
    getSettings: new GetSettingsCase(settingsRepository),
    saveItem: new SaveItemCase(itemRepository),
    setItemAsMandatory: new SetItemAsMandatoryCase(itemRepository),
    setItemAsNotMandatory: new SetItemAsNotMandatoryCase(itemRepository),
    setItemAsNotRequired: new SetItemAsNotRequiredCase(itemRepository),
    setItemAsRequired: new SetItemAsRequiredCase(itemRepository),
    setSettings: new SetSettingsCase(settingsRepository),
    updateCategory: new UpdateCategoryCase(categoryRepository),
  };
}
