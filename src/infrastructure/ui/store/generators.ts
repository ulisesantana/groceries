import { Category, Id, Item, Settings } from "../../../domain";
import { generateUseCases, UseCases } from "../../../application";
import { PouchDatasource } from "../../data-sources/pouch-db.data-source";
import {
  CategoryRepositoryPouchDb,
  ItemRepositoryPouchDB,
  SettingsRepositoryLocalStorage,
} from "../../repositories";
import { LocalStorage, LocalStorageCollection } from "../../data-sources";
import { initStore, Store, StoreActions } from "./useStore";

export function generateUseCasesWithRemoteDb(settings: Settings, cb: Function) {
  return generateUseCases({
    categoryRepository: new CategoryRepositoryPouchDb(
      PouchDatasource.createPouchDbBrowser({
        dbName: PouchDatasource.dbName,
        dbUrl: settings.syncUrl,
        cb,
      })
    ),
    itemRepository: new ItemRepositoryPouchDB(
      PouchDatasource.createPouchDbBrowser({
        dbName: PouchDatasource.dbName,
        dbUrl: settings.syncUrl,
        cb,
      })
    ),
    settingsRepository: new SettingsRepositoryLocalStorage(
      new LocalStorage<Settings>(LocalStorageCollection.Settings)
    ),
  });
}

export function generateUseCasesWithLocalDb() {
  const categoryRepository = new CategoryRepositoryPouchDb(
    PouchDatasource.createPouchDbBrowser({
      dbName: PouchDatasource.dbName,
    })
  );
  const itemRepository = new ItemRepositoryPouchDB(
    PouchDatasource.createPouchDbBrowser({
      dbName: PouchDatasource.dbName,
    })
  );
  const settingsRepository = new SettingsRepositoryLocalStorage(
    new LocalStorage<Settings>(LocalStorageCollection.Settings)
  );
  return generateUseCases({
    categoryRepository,
    itemRepository,
    settingsRepository,
  });
}

export function generateActions(
  store: Store,
  useCases: UseCases
): StoreActions {
  return {
    async createCategory(category: Category) {
      await useCases.createCategory.exec(category);
      return store.actions.getCategories();
    },
    async createItem(item: Item) {
      await useCases.createItem.exec(item);
      return store.actions.getCategories();
    },
    getCategories() {
      useCases.getCategories.exec().then((categories) => {
        store.categories = categories;
      });
    },
    getItems() {
      useCases.getItems.exec().then((items) => {
        store.items = items;
      });
    },
    getSettings() {
      useCases.getSettings.exec().then((settings) => {
        store.settings = settings;
      });
    },
    setItemAsRequired(id: Id) {
      useCases.setItemAsRequired.exec(id).then(() => {
        return store.actions.getItems();
      });
    },
    setItemAsNotRequired(id: Id) {
      useCases.setItemAsNotRequired.exec(id).then(() => {
        return store.actions.getItems();
      });
    },
    setItemAsMandatory(id: Id) {
      useCases.setItemAsMandatory.exec(id).then(() => {
        return store.actions.getItems();
      });
    },
    setItemAsNotMandatory(id: Id) {
      useCases.setItemAsNotMandatory.exec(id).then(() => {
        return store.actions.getItems();
      });
    },
    setSettings(settings: Settings) {
      useCases.setSettings.exec(settings).then((savedSettings) => {
        store.settings = savedSettings;
        initStore();
      });
    },
    async updateCategory(category: Category) {
      await useCases.updateCategory.exec(category);
      return store.actions.getCategories();
    },
    async updateItem(item: Item) {
      await useCases.updateItem.exec(item);
      return store.actions.getItems();
    },
  };
}
