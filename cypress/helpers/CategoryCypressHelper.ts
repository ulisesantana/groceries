import { Category } from "../../src/domain";
import { messages } from "../../src/messages";
import { CypressHelper } from "./CypressHelper";

export class CategoryCypressHelper extends CypressHelper {
  createCategory(category: Category) {
    const initialUrl = this.cy.url();
    this.sherpa.goToCreateCategoryView();
    this.sherpa.getByLabel(messages.categoryForm.nameInput).type(category.name);
    this.sherpa.getByLabel(messages.categoryForm.iconInput).type(category.icon);
    this.sherpa
      .getByLabel(messages.categoryForm.colorInput)
      .type(category.color);
    this.sherpa.getByLabel(messages.categoryForm.submitButton.create).click();
    initialUrl.then((url) => {
      this.sherpa.visit(url);
    });
  }
}
