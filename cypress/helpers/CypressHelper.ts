import { Category, Item } from "../../src/domain";
import { routes } from "../../src/infrastructure/ui/routes";
import { messages } from "../../src/messages";

export class CypressHelper {
  constructor(
    private readonly cy: Cypress.cy & CyEventEmitter,
    private readonly baseUrl: string
  ) {}

  async clearIndexedDB() {
    const databases = await window.indexedDB.databases();

    return Promise.all(
      databases.map(
        (db) =>
          new Promise((resolve, reject) => {
            const request = window.indexedDB.deleteDatabase(db.name!);

            request.addEventListener("success", resolve);
            // Note: we need to also listen to the "blocked" event
            // (and resolve the promise) due to https://stackoverflow.com/a/35141818
            request.addEventListener("blocked", resolve);
            request.addEventListener("error", reject);
          })
      )
    );
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

  createItem(item: Item) {
    const initialUrl = this.cy.url();
    this.goToCreateItemView();
    this.getByLabel(messages.itemForm.nameInput).clear().type(item.name);
    this.getByLabel(messages.itemForm.quantityInput)
      .clear()
      .type(String(item.quantity));
    this.getByLabel(messages.itemForm.categoryInput).select(
      item.category.title
    );
    this.setCheckbox(messages.itemForm.isRequiredInput, item.isRequired);
    this.setCheckbox(messages.itemForm.isRequiredInput, item.isMandatory);
    this.getByLabel(messages.itemForm.submitButton.create).click();
    initialUrl.then((url) => this.visit(url));
  }

  getByLabel(label: string) {
    return this.cy.get(`[aria-label="${label}"]`);
  }

  goToAllItemsListView() {
    this.cy.visit(this.baseUrl);
    this.getByLabel(messages.menu.allItemsListCTA).click();
  }

  goToCreateCategoryView() {
    this.cy.visit(this.baseUrl + routes.categories.create);
  }

  goToCreateItemView() {
    this.cy.visit(this.baseUrl);
    this.getByLabel(messages.menu.createItem).click();
  }

  setCheckbox(label: string, checked: boolean) {
    this.getByLabel(label)[checked ? "check" : "uncheck"]();
  }

  visit(url: string) {
    this.cy.visit(url);
  }
}
