import { messages } from "../../src/messages";
import { CategoryBuilder, ItemBuilder } from "../../src/tests/builders";
import { CypressHelper } from "../helpers";

describe("Item form should", () => {
  const category = CategoryBuilder.random();
  const item = ItemBuilder.init()
    .withCategory(category)
    .withIsRequired(false)
    .withIsMandatory(false)
    .build();
  const helper = new CypressHelper(cy, Cypress.config().baseUrl!);

  before(async () => {
    await helper.clearIndexedDB();
  });

  it("add a new item", () => {
    // Check the item doesn't exist
    helper.goToAllItemsListView();
    cy.get("body").should("not.contain.text", item.name);
    // Create a category
    helper.createCategory(category);
    // Create an item for that category
    helper.goToCreateItemView();
    helper.getByLabel(messages.itemForm.nameInput).type(item.name);
    helper.getByLabel(messages.itemForm.submitButton.create).click();
    // Check the item is created
    helper.goToAllItemsListView();
    cy.get("body").should("contain.text", item.name);
  });

  it("update the item", () => {
    // TODO: Update the whole item
    const oldName = item.name;
    const newName = "Irrelevant item name";
    const newQuantity = "42";
    const oldQuantity = item.quantity;
    // Select Item
    helper.goToAllItemsListView();
    cy.contains(oldName).dblclick();
    // Update item
    helper.getByLabel(messages.itemForm.nameInput).clear().type(newName);
    helper
      .getByLabel(messages.itemForm.quantityInput)
      .clear()
      .type(newQuantity);
    helper.getByLabel(messages.itemForm.isRequiredInput).click();
    helper.getByLabel(messages.itemForm.isMandatoryInput).click();
    helper.getByLabel(messages.itemForm.submitButton.update).click();
    // Check the item is updated
    helper.goToAllItemsListView();
    helper.getByTestId(newName).should("contain.text", newName);
    helper.getByTestId(newName).should("not.contain.text", oldName);
    helper.getByTestId(newName).should("contain.text", newQuantity);
    helper.getByTestId(newName).should("not.contain.text", oldQuantity);
    helper.getByTestId(newName, `> [data-is-required="true"]`).should("exist");
    helper.getByTestId(newName, `> [data-is-mandatory="true"]`).should("exist");
  });

  it("delete the item", () => {
    const item = ItemBuilder.init().withCategory(category).build();
    //Check item does not exist
    helper.goToAllItemsListView();
    cy.get("body").should("not.contain.text", item.name);
    // Create item
    helper.createItem(item);
    // Delete item
    helper.goToAllItemsListView();
    cy.contains(item.name).dblclick();
    cy.contains(messages.removeItemButton.cta).click();
    cy.contains(messages.removeItemButton.confirm).click();
    // Check item does not exist anymore
    cy.get("body").should("not.contain.text", item.name);
  });

  it("the visual feedback should disappear 2 seconds after creating an item", () => {
    const item = ItemBuilder.init().withCategory(category).build();
    // Create item
    helper.createItem(item);
    cy.wait(2000);
    helper.contains(messages.itemForm.success.create).should("not.exist");
  });

  it("the visual feedback should disappear 2 seconds after updating an item", () => {
    const item = ItemBuilder.init().withCategory(category).build();
    const oldName = item.name;
    const newName = "Irrelevant item name";
    // Create item
    helper.createItem(item);
    // Select Item
    helper.goToAllItemsListView();
    cy.contains(oldName).dblclick();
    // Update item
    helper.getByLabel(messages.itemForm.nameInput).clear().type(newName);
    helper.getByLabel(messages.itemForm.submitButton.update).click();
    helper.contains(messages.itemForm.success.update).should("exist");
    cy.wait(2000);
    helper.contains(messages.itemForm.success.update).should("not.exist");
  });
});
