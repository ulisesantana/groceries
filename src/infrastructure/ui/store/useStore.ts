import {
  Category,
  CategoryList,
  Id,
  Item,
  ItemList,
  Settings,
} from "../../../domain";
import { proxy, useSnapshot } from "valtio";
import {
  generateActions,
  generateUseCasesWithLocalDb,
  generateUseCasesWithRemoteDb,
} from "./generators";

export interface StoreActions {
  createCategory(category: Category): Promise<void>;
  createItem(item: Item): Promise<void>;
  getCategories(): void;
  getItems(): void;
  getSettings(): void;
  removeItem(id: Id): void;
  setItemAsRequired(id: Id): void;
  setItemAsNotRequired(id: Id): void;
  setItemAsMandatory(id: Id): void;
  setItemAsNotMandatory(id: Id): void;
  setSettings(settings: Settings): void;
  updateItem(item: Item): Promise<void>;
  updateCategory(category: Category): Promise<void>;
}

export interface Store {
  actions: StoreActions;
  categories: CategoryList;
  items: ItemList;
  settings: Settings;
}

const store = proxy<Store>({
  categories: new CategoryList([]),
  items: new ItemList([]),
  settings: { syncUrl: undefined },
  actions: {
    async createCategory() {},
    async createItem() {},
    getCategories() {},
    getItems() {},
    getSettings() {},
    removeItem(id: Id) {},
    setItemAsRequired() {},
    setItemAsNotRequired() {},
    setItemAsMandatory() {},
    setItemAsNotMandatory() {},
    setSettings() {},
    async updateItem() {},
    async updateCategory() {},
  },
});

export function initStore(useCases = generateUseCasesWithLocalDb()) {
  store.categories = new CategoryList([]);
  store.items = new ItemList([]);
  useCases.getSettings.exec().then((settings) => {
    if (settings.syncUrl) {
      console.log("[INIT STORE]: REMOTE DB");
      store.settings = settings;
      store.actions = generateActions(
        store,
        generateUseCasesWithRemoteDb(settings, store.actions.getItems)
      );
    } else {
      console.log("[INIT STORE]: LOCAL DB");
      store.actions = generateActions(store, useCases);
    }
  });
}

export function useStore() {
  return useSnapshot(store);
}
