import { messages } from "../../src/messages";
import { CategoryBuilder, ItemBuilder } from "../../src/tests/builders";
import { CypressHelper } from "../helpers/";

describe("Item CRUD should", () => {
  const baseUrl = "http://localhost:3000";
  const category = CategoryBuilder.random();
  const item = ItemBuilder.init().withCategory(category).build();
  const cypressHelper = new CypressHelper(cy, baseUrl);

  before(async () => {
    await cypressHelper.clearIndexedDB();
  });

  it("add a new item", () => {
    // Check the item doesn't exist
    cypressHelper.goToAllItemsListView();
    cy.get("body").should("not.contain.text", item.name);
    // Create a category
    cypressHelper.createCategory(category);
    // Create an item for that category
    cypressHelper.goToCreateItemView();
    cypressHelper.getByLabel(messages.itemForm.nameInput).type(item.name);
    cypressHelper.getByLabel(messages.itemForm.submitButton.create).click();
    // Check the item is created
    cypressHelper.goToAllItemsListView();
    cy.get("body").should("contain.text", item.name);
  });

  it("update the item", () => {
    const oldName = item.name;
    const newName = "Irrelevant item name";
    // Select Item
    cypressHelper.goToAllItemsListView();
    cy.contains(oldName).click();
    // Update item
    cypressHelper.getByLabel(messages.itemForm.nameInput).clear().type(newName);
    cypressHelper.getByLabel(messages.itemForm.submitButton.update).click();
    // Check the item is updated
    cypressHelper.goToAllItemsListView();
    cy.get("body").should("contain.text", newName);
    cy.get("body").should("not.contain.text", oldName);
  });

  it("delete the item", () => {
    const item = ItemBuilder.init().withCategory(category).build();
    //Check item does not exist
    cypressHelper.goToAllItemsListView();
    cy.get("body").should("not.contain.text", item.name);
    // Create item
    cypressHelper.createItem(item);
    // Delete item
    cy.contains(item.name).click();
    cy.contains(messages.removeItemButton.cta).click();
    cy.contains(messages.removeItemButton.confirm).click();
    // Check item does not exist anymore
    cy.get("body").should("not.contain.text", item.name);
  });
});
