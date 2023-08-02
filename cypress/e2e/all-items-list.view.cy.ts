import { messages } from "../../src/messages";
import { CategoryBuilder, ItemBuilder } from "../../src/tests/builders";
import { CypressHelper } from "../helpers/";

describe("All items list should", () => {
  const category = CategoryBuilder.random();
  const item = ItemBuilder.init().withCategory(category).build();
  const cypressHelper = new CypressHelper(cy, Cypress.config().baseUrl!);

  before(async () => {
    await cypressHelper.clearIndexedDB();
    cypressHelper.goToAllItemsListView();
  });

  it("show a message if there are no items to list", () => {
    cy.get("body").contains(messages.itemList.empty);
  });

  it("show how many items are listed");
  it("every item list is collapsable, allowing to switch items visibility");
  it("save item list visibility while navigating through the app");
  it("navigate to item details with form if an item is clicked");

  describe("show each item with", () => {
    it("its name");
    it("its quantity");
    it("its 'is required' status");
    it("its 'is mandatory' status");
  });
});
