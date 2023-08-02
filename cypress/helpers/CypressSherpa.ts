import { routes } from "../../src/infrastructure/ui/routes";
import { messages } from "../../src/messages";

export class CypressSherpa {
  constructor(
    private readonly cy: Cypress.cy & CyEventEmitter,
    private readonly baseUrl: string
  ) {}
  goToCreateCategoryView() {
    this.cy.visit(this.baseUrl + routes.categories.create);
  }

  goToCreateItemView() {
    this.cy.visit(this.baseUrl);
    this.getByLabel(messages.menu.createItem).click();
  }

  goToAllItemsListView() {
    this.cy.visit(this.baseUrl);
    this.getByLabel(messages.menu.allItemsListCTA).click();
  }

  getByLabel(label: string) {
    return this.cy.get(`[aria-label="${label}"]`);
  }

  visit(url: string) {
    this.cy.visit(url);
  }
}
