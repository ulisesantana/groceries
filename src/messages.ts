import { Category } from "./domain";

export const messages = {
  menu: {
    requiredListCTA: "Show items to buy",
    mandatoryListCTA: "Show mandatory items to buy",
    allItemsListCTA: "Show all items",
    searchCTA: "Search items",
  },
  actions: {
    setItemAsRequired: "Set item to buy",
    setItemAsNotRequired: "Remove item from buy list",
    setItemAsMandatory: "Set item as mandatory to buy",
    setItemAsNotMandatory: "Remove item from mandatory to buy list",
  },
  emptyList: "There are no items in this list",
  search: {
    searchInput: "🔍 Search",
    resetCTA: "Reset your search",
    closeCTA: "Close search",
  },
  settings: {
    syncUrlInputLabel:
      "Add your CouchDB url for syncing your data across devices.",
    syncUrlInput: "Set your database url",
    submitButton: "Save settings",
  },
  categoryForm: {
    nameInput: "Category name",
    iconInput: "Category icon",
    iconInputPlaceholder: "Choose an emoji as category icon",
    colorInput: "Category color",
    submitButton: {
      create: "Create category",
      update: "Update category",
    },
    success: {
      create: "Category created successfully",
      update: "Category updated successfully",
    },
    errors: {
      categoryAlreadyExists(category: Category) {
        return `Category "${category.name}" already exists.`;
      },
      categoryDoesNotExist(category: Category) {
        return `Category "${category.name}" does not exist.`;
      },
      unknown(error: Error) {
        return `Unknown error: ${error.message}`;
      },
    },
  },
};
