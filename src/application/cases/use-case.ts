import {
  CategoryRepository,
  ItemRepository,
  SettingsRepository,
} from "../repositories";
import {
  CreateCategoryCase,
  CreateItemCase,
  GetCategoriesCase,
  GetItemsCase,
  GetSettingsCase,
  RemoveItemCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  SetSettingsCase,
  UpdateCategoryCase,
  UpdateItemCase,
} from "./index";

export interface UseCase<Input, Output> {
  exec(input: Input): Output;
}

export interface UseCases {
  createCategory: CreateCategoryCase;
  createItem: CreateItemCase;
  getCategories: GetCategoriesCase;
  getItems: GetItemsCase;
  getSettings: GetSettingsCase;
  removeItem: RemoveItemCase;
  setItemAsRequired: SetItemAsRequiredCase;
  setItemAsNotRequired: SetItemAsNotRequiredCase;
  setItemAsMandatory: SetItemAsMandatoryCase;
  setItemAsNotMandatory: SetItemAsNotMandatoryCase;
  setSettings: SetSettingsCase;
  updateCategory: UpdateCategoryCase;
  updateItem: UpdateItemCase;
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
    createItem: new CreateItemCase(itemRepository),
    getCategories: new GetCategoriesCase(categoryRepository),
    getItems: new GetItemsCase(itemRepository),
    getSettings: new GetSettingsCase(settingsRepository),
    removeItem: new RemoveItemCase(itemRepository),
    setItemAsMandatory: new SetItemAsMandatoryCase(itemRepository),
    setItemAsNotMandatory: new SetItemAsNotMandatoryCase(itemRepository),
    setItemAsNotRequired: new SetItemAsNotRequiredCase(itemRepository),
    setItemAsRequired: new SetItemAsRequiredCase(itemRepository),
    setSettings: new SetSettingsCase(settingsRepository),
    updateCategory: new UpdateCategoryCase(categoryRepository),
    updateItem: new UpdateItemCase(itemRepository),
  };
}
