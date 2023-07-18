import { Category, Item } from "./domain";

export const messages = {
  menu: {
    createItem: "Create new item",
    requiredListCTA: "Show items to buy",
    mandatoryListCTA: "Show mandatory items to buy",
    allItemsListCTA: "Show all items",
    searchCTA: "Search items",
  },
  actions: {
    createACategory: "Create a new category",
    goToCategories: "Manage your categories",
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
  removeItemButton: {
    cta: "Delete item",
    dialogText: "Are you sure? This action can't be undone.",
    confirm: "Yes, delete the item",
    cancel: "No",
  },
  itemForm: {
    nameInput: "Name",
    categoryInput: "Category",
    quantityInput: "Quantity",
    isRequiredInput: "You need to buy this item",
    isMandatoryInput: "You MUST buy this item",
    submitButton: {
      create: "Create item",
      update: "Update item",
    },
    success: {
      create: "Item created successfully",
      update: "Item updated successfully",
    },
    errors: {
      thereAreNoCategories: {
        message:
          "You need to create first at least one category for your items.",
        cta: "Create your first category",
      },
      itemDoesNotExist(item: Item) {
        return `Item "${item.name}" does not exist.`;
      },
      unknown(error: Error) {
        return `Unknown error: ${error.message}`;
      },
    },
  },
};
