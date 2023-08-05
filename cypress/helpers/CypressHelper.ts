import { Category, Item } from "../../src/domain";
import { routes } from "../../src/infrastructure/ui/routes";
import { messages } from "../../src/messages";
import { CategoryBuilder, ItemBuilder } from "../../src/tests/builders";
import { IndexedDBTestHelper } from "./IndexedDBTestHelper";

export class CypressHelper {
  constructor(
    private readonly cy: Cypress.cy & CyEventEmitter,
    private readonly baseUrl: string
  ) {}

  clearIndexedDB() {
    return IndexedDBTestHelper.clearIndexedDB();
  }

  contains(text: string) {
    return this.cy.contains(text);
  }

  createCategory(category: Category) {
    const initialUrl = this.cy.url();
    this.goToCreateCategoryView();
    this.getByLabel(messages.categoryForm.nameInput).type(category.name);
    this.getByLabel(messages.categoryForm.iconInput).type(category.icon);
    this.getByLabel(messages.categoryForm.colorInput).type(category.color);
    this.getByLabel(messages.categoryForm.submitButton.create).click();
    initialUrl.then((url) => this.visit(url));
  }

  createCategories(amountOfCategories: number) {
    const categories = Array.from({ length: amountOfCategories }).map(
      CategoryBuilder.random
    );

    for (const category of categories) {
      this.createCategory(category);
    }

    return categories;
  }

  createItem(item: Item) {
    this.goToCreateItemView();
    this.getByLabel(messages.itemForm.nameInput).clear().type(item.name);
    this.getByLabel(messages.itemForm.quantityInput)
      .clear()
      .type(String(item.quantity));
    this.getByLabel(messages.itemForm.categoryInput).select(
      item.category.title
    );
    this.setCheckbox(messages.itemForm.isRequiredInput, item.isRequired);
    this.setCheckbox(messages.itemForm.isMandatoryInput, item.isMandatory);
    this.getByLabel(messages.itemForm.submitButton.create).click();
  }

  createItemsForCategory(category: Category, amountOfItems: number) {
    const items = Array.from({ length: amountOfItems }).map((_, index) =>
      ItemBuilder.init()
        .withQuantity(index + 1)
        .withCategory(category)
        .build()
    );

    for (const item of items) {
      this.createItem(item);
    }

    return items;
  }

  getByLabel(label: string, selector: string = "") {
    return this.cy.get(`[aria-label="${label}"] ${selector}`);
  }

  getByTestId(testId: string, selector: string = "") {
    return this.cy.get(`[data-testid="${testId}"] ${selector}`);
  }

  goToAllItemsListView() {
    this.visit(this.baseUrl);
    this.getByLabel(messages.menu.allItemsListCTA).click();
  }

  goToCreateCategoryView() {
    this.visit(this.baseUrl + routes.categories.create);
  }

  goToCreateItemView() {
    this.visit(this.baseUrl);
    this.getByLabel(messages.menu.createItem).click();
  }

  setCheckbox(label: string, checked: boolean) {
    this.getByLabel(label)[checked ? "check" : "uncheck"]();
  }

  shouldBeRendered(items: Item[]) {
    for (const item of items) {
      this.cy.contains(item.name).should("be.visible");
    }
  }

  shouldNotBeRendered(items: Item[]) {
    for (const item of items) {
      this.cy.contains(item.name).should("not.be.visible");
    }
  }

  visit(url: string) {
    this.cy.visit(url);
  }
}
