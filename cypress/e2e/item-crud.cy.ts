import { messages } from "../../src/messages";
import { CategoryBuilder, ItemBuilder } from "../../src/tests/builders";
import { CategoryCypressHelper } from "../helpers/CategoryCypressHelper";
import { CypressSherpa } from "../helpers/CypressSherpa";
import base = Mocha.reporters.base;

describe("Item CRUD should", () => {
  const baseUrl = "http://localhost:3000";
  const category = CategoryBuilder.random();
  const sherpa = new CypressSherpa(cy, baseUrl);
  const categoryHelper = new CategoryCypressHelper(cy, baseUrl);

  it("add new item", () => {
    const newItem = ItemBuilder.random();
    // Check the item doesn't exist
    sherpa.goToAllItemsListView();
    cy.get("body").should("not.contain.text", newItem.name);
    // Create a category
    categoryHelper.createCategory(category);
    // Create an item for that category
    sherpa.goToCreateItemView();
    sherpa.getByLabel(messages.itemForm.nameInput).type(newItem.name);
    sherpa.getByLabel(messages.itemForm.submitButton.create).click();
    // Check the item is created
    sherpa.goToAllItemsListView();
    cy.get("body").should("contain.text", newItem.name);
  });
});
