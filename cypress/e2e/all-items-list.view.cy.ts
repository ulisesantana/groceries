import { Category, Item } from "../../src/domain";
import { messages } from "../../src/messages";
import { CypressHelper } from "../helpers";

describe("All items list should", () => {
  const cypressHelper = new CypressHelper(cy, Cypress.config().baseUrl!);
  let categories: Category[];
  let items: Item[] = [];
  const totalCategories = 2;

  before(async () => {
    await cypressHelper.clearIndexedDB();
    cypressHelper.goToAllItemsListView();
  });

  it("show a message if there are no items to list", () => {
    cy.get("body").contains(messages.itemList.empty);
  });

  it("show how many items are listed", () => {
    categories = cypressHelper.createCategories(totalCategories);
    const itemsPerCategory = 3;
    const totalItems = itemsPerCategory * totalCategories;
    for (const category of categories) {
      const newItems = cypressHelper.createItemsForCategory(
        category,
        itemsPerCategory
      );
      items = items.concat(newItems);
    }

    cypressHelper.contains(messages.itemList.total(totalItems));
  });

  it("every item list is collapsable, allowing to toggle categories", () => {
    cypressHelper.goToAllItemsListView();
    cypressHelper.shouldBeRendered(items);

    for (const category of categories) {
      const categoryItems = items.filter(
        (item) => item.category.title === category.title
      );
      // const categoryToggler = cypressHelper.getByLabel(category.title);
      // const itemList = cypressHelper.getByLabel(category.title).parent();
      cypressHelper.getByLabel(category.title).click();
      for (const item of categoryItems) {
        cy.get(item.name).should("not.exist");
      }
      cypressHelper.getByLabel(category.title).click();
      for (const item of categoryItems) {
        cy.contains(item.name);
      }
    }
  });
  it("save which categories are toggled while navigating through the app");
  it("navigate to item details if an item is clicked");

  describe("show each item with", () => {
    it("its name");
    it("its quantity");
    it("its 'is required' status");
    it("its 'is mandatory' status");
  });
});
