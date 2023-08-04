import {
  CategoryRepository,
  ItemRepository,
  SettingsRepository,
  VisibilityDictionaryRepository,
} from "../repositories";
import { GetVisibilityDictionaryCase } from "./get-visibility-dictionary/get-visibility-dictionary.case";
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
import { SetVisibilityDictionaryCase } from "./set-visibility-dictionary/set-visibility-dictionary.case";

export interface UseCase<Input, Output> {
  exec(input: Input): Output;
}

export interface UseCases {
  createCategory: CreateCategoryCase;
  createItem: CreateItemCase;
  getCategories: GetCategoriesCase;
  getItems: GetItemsCase;
  getSettings: GetSettingsCase;
  getCategoryVisibilityDictionary: GetVisibilityDictionaryCase;
  removeItem: RemoveItemCase;
  setItemAsRequired: SetItemAsRequiredCase;
  setItemAsNotRequired: SetItemAsNotRequiredCase;
  setItemAsMandatory: SetItemAsMandatoryCase;
  setItemAsNotMandatory: SetItemAsNotMandatoryCase;
  setSettings: SetSettingsCase;
  setCategoryVisibilityDictionary: SetVisibilityDictionaryCase;
  updateCategory: UpdateCategoryCase;
  updateItem: UpdateItemCase;
}

interface Repositories {
  categoryRepository: CategoryRepository;
  itemRepository: ItemRepository;
  settingsRepository: SettingsRepository;
  categoryVisibilityDictionaryRepository: VisibilityDictionaryRepository;
}

export function generateUseCases({
  categoryRepository,
  itemRepository,
  settingsRepository,
  categoryVisibilityDictionaryRepository,
}: Repositories): UseCases {
  return {
    createCategory: new CreateCategoryCase(categoryRepository),
    createItem: new CreateItemCase(itemRepository),
    getCategories: new GetCategoriesCase(categoryRepository),
    getItems: new GetItemsCase(itemRepository),
    getSettings: new GetSettingsCase(settingsRepository),
    getCategoryVisibilityDictionary: new GetVisibilityDictionaryCase(
      categoryVisibilityDictionaryRepository
    ),
    removeItem: new RemoveItemCase(itemRepository),
    setItemAsMandatory: new SetItemAsMandatoryCase(itemRepository),
    setItemAsNotMandatory: new SetItemAsNotMandatoryCase(itemRepository),
    setItemAsNotRequired: new SetItemAsNotRequiredCase(itemRepository),
    setItemAsRequired: new SetItemAsRequiredCase(itemRepository),
    setSettings: new SetSettingsCase(settingsRepository),
    setCategoryVisibilityDictionary: new SetVisibilityDictionaryCase(
      categoryVisibilityDictionaryRepository
    ),
    updateCategory: new UpdateCategoryCase(categoryRepository),
    updateItem: new UpdateItemCase(itemRepository),
  };
}
