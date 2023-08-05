import { Category, Item } from "../../src/domain";
import { messages } from "../../src/messages";
import { CypressHelper } from "../helpers";

describe("All items list should", () => {
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
    const itemsPerCategory = 3;
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
  it("navigate to item details if an item is clicked");

  describe("show each item with", () => {
    it("its name");
    it("its quantity");
    it("its 'is required' status");
    it("its 'is mandatory' status");
  });
});
