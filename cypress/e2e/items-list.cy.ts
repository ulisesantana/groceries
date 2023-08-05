import { Category, Item } from "../../src/domain";
import { messages } from "../../src/messages";
import { CategoryBuilder, ItemBuilder } from "../../src/tests/builders";
import { CypressHelper } from "../helpers";

describe("Items list should", () => {
  const helper = new CypressHelper(cy, Cypress.config().baseUrl!);
  let categories: Category[];
  let items: Item[] = [];
  const totalCategories = 2;

  before(async () => {
    await helper.clearIndexedDB();
  });

  beforeEach(() => {
    helper.goToAllItemsListView();
  });

  it("show a message if there are no items to list", () => {
    cy.get("body").contains(messages.itemList.empty);
  });

  it("show how many items are listed", () => {
    categories = helper.createCategories(totalCategories);
    const itemsPerCategory = 2;
    const totalItems = itemsPerCategory * totalCategories;
    for (const category of categories) {
      const newItems = helper.createItemsForCategory(
        category,
        itemsPerCategory
      );
      items = items.concat(newItems);
    }

    helper.goToAllItemsListView();

    helper.contains(messages.itemList.total(totalItems));
  });

  it("every item list is collapsable, allowing to toggle categories", () => {
    helper.shouldBeRendered(items);

    for (const category of categories) {
      const categoryItems = items.filter(
        (item) => item.category.title === category.title
      );
      // Hide category items
      helper.getByLabel(category.title).click();
      helper.shouldNotBeRendered(categoryItems);
      // Show category items
      helper.getByLabel(category.title).click();
      helper.shouldBeRendered(categoryItems);
    }
  });

  it("save which categories are toggled while navigating through the app", () => {
    const [category] = categories;
    const categoryItems = items.filter(
      (item) => item.category.title === category.title
    );
    // Hide category
    helper.getByLabel(category.title).click();
    helper.shouldNotBeRendered(categoryItems);
    // Go to other view and come back
    helper.goToCreateItemView();
    helper.goToAllItemsListView();
    // Check category items keep hidden
    helper.shouldNotBeRendered(categoryItems);
  });

  it("expand and collapse all categories", () => {
    helper.getByLabel(messages.itemList.expandAllCategories).click();
    helper.shouldBeRendered(items);
    helper.getByLabel(messages.itemList.collapseAllCategories).click();
    helper.shouldNotBeRendered(items);
  });

  it("navigate to item details if an item is double clicked", () => {
    const [item] = items;
    helper.contains(item.name).dblclick();
    cy.url().should("include", "items/details");
  });

  it("navigate to category details if a category is double clicked", () => {
    const [category] = categories;
    helper.contains(category.name).dblclick();
    cy.url().should("include", "categories/details");
  });

  it("update item quantity by clicking on it", () => {
    const [item] = items;
    const newQuantity = "42";
    // Update
    helper.getByTestId(item.name, "> .quantity button").click();
    helper
      .getByLabel(messages.itemForm.quantityInput)
      .clear()
      .type(newQuantity)
      .blur();
    // Reload
    cy.wait(250);
    cy.reload();
    // Check new value
    helper.getByTestId(item.name).contains(newQuantity);
  });

  it("update item name by clicking on it", () => {
    const [item] = items;
    const newName = "Irrelevant item name";
    // Update
    helper.getByTestId(item.name, "> .item button").click();
    helper.getByTestId(item.name, "> .item input").clear().type(newName).blur();
    // Reload
    cy.wait(250);
    cy.reload();
    // Check new value
    helper.getByTestId(newName).contains(newName);
  });

  describe("set item as", () => {
    const category = CategoryBuilder.random();
    const item = ItemBuilder.init()
      .withCategory(category)
      .withIsRequired(false)
      .withIsMandatory(false)
      .build();

    before(() => {
      helper.createCategory(category);
      helper.createItem(item);
      helper.goToAllItemsListView();
    });

    it("required", () => {
      helper.getByTestId(item.name, "> .is-required > button").click();
      helper
        .getByTestId(item.name, "> [data-is-required='true']")
        .should("exist");
    });

    it("not required", () => {
      helper.getByTestId(item.name, "> .is-required > button").click();
      helper
        .getByTestId(item.name, "> [data-is-required='false']")
        .should("exist");
    });

    it("mandatory", () => {
      helper.getByTestId(item.name, "> .is-mandatory > button").click();
      helper
        .getByTestId(item.name, "> [data-is-mandatory='true']")
        .should("exist");
    });

    it("not mandatory", () => {
      helper.getByTestId(item.name, "> .is-mandatory > button").click();
      helper
        .getByTestId(item.name, "> [data-is-mandatory='false']")
        .should("exist");
    });

    it("required if it's set as mandatory", () => {
      helper.getByTestId(item.name, "> .is-mandatory > button").click();
      helper
        .getByTestId(item.name, "> [data-is-required='true']")
        .should("exist");
    });

    it("not mandatory if it's set as not required", () => {
      helper.getByTestId(item.name, "> .is-required > button").click();
      helper
        .getByTestId(item.name, "> [data-is-mandatory='false']")
        .should("exist");
    });
  });

  describe("show each item with", () => {
    const category = CategoryBuilder.random();
    const item = ItemBuilder.init()
      .withCategory(category)
      .withIsRequired(false)
      .withIsMandatory(false)
      .build();

    before(() => {
      helper.createCategory(category);
      helper.createItem(item);
      helper.goToAllItemsListView();
    });

    it("its name", () => {
      helper.getByTestId(item.name).contains(item.name);
    });
    it("its quantity", () => {
      helper.getByTestId(item.name).contains(item.name);
    });
    it("its 'is required' status", () => {
      helper
        .getByTestId(
          item.name,
          `> [data-is-required="${String(item.isRequired)}"]`
        )
        .should("exist");
    });
    it("its 'is mandatory' status", () => {
      helper
        .getByTestId(
          item.name,
          `> [data-is-mandatory="${String(item.isMandatory)}"]`
        )
        .should("exist");
    });
  });
});
