import { CategoryBuilder, ItemBuilder } from "../../src/tests/builders";
import { CypressHelper } from "../helpers";

describe("Items list search should", () => {
  const helper = new CypressHelper(cy, Cypress.config().baseUrl!);
  const category = CategoryBuilder.init().withName("Random category").build();
  const items = [
    ItemBuilder.init()
      .withCategory(category)
      .withIsRequired(true)
      .withIsMandatory(false)
      .withName("Agua")
      .build(),
    ItemBuilder.init()
      .withCategory(category)
      .withIsRequired(false)
      .withIsMandatory(false)
      .withName("Aguacate")
      .build(),
    ItemBuilder.init()
      .withCategory(category)
      .withIsMandatory(true)
      .withName("Coco")
      .build(),
    ItemBuilder.init()
      .withCategory(category)
      .withIsMandatory(true)
      .withName("Beletén")
      .build(),
  ];

  before(async () => {
    await helper.clearIndexedDB();
  });

  beforeEach(() => {
    helper.goToAllItemsListView();
    helper.goToSearchView();
  });

  it("prepare data", () => {
    helper.createCategory(category);
    items.map(helper.createItem.bind(helper));
    helper.goToAllItemsListView();
  });

  it("show only items which name contains search value", () => {
    const [beleten] = [...items].reverse();
    helper.shouldBeRendered(items);
    helper.getByTestId("search", "input").focus().type("bele");
    helper.contains(beleten.name);
    helper.getByTestId("list-item-row").should("have.length", 1);
  });

  it("show all items when deleting search", () => {
    helper.getByTestId("search", "input").focus().clear();
    helper.shouldBeRendered(items);
  });

  it("reset search with a button", () => {
    helper.getByTestId("search", "input").focus().type("irrelevant");
    helper.getByTestId("list-item-row").should("have.length", 0);
    helper.getByTestId("search", "button").click({ force: true });
    helper.getByTestId("search", "input").should("be.empty");
    helper.getByTestId("list-item-row").should("have.length", items.length);
  });

  it("close search with the same button when the search input is empty", () => {
    helper.getByTestId("search", "input").focus().clear();
    helper.getByTestId("list-item-row").should("have.length", items.length);
    helper.getByTestId("search", "button").click({ force: true });
    helper.getByTestId("search", "input").should("not.exist");
    helper.getByTestId("list-item-row").should("have.length", items.length);
  });

  it("search on required items view filtering only by search value", () => {
    const [agua, aguacate] = items;
    helper.goToRequiredItemsListView();
    helper.goToSearchView();
    // Check is showing only the mandatory items
    helper.getByTestId("list-item-row").should("have.length", 3);
    // You want to search something else
    helper.getByTestId("search", "input").focus().type("agua");
    // You will see Agua and Aguacate
    helper.contains(agua.name);
    helper.contains(aguacate.name);
    helper.getByTestId("list-item-row").should("have.length", 2);
  });

  it("search on mandatory items view filtering only by search value", () => {
    const [agua, aguacate] = items;
    helper.goToMandatoryItemsListView();
    helper.goToSearchView();
    // Check is showing only the mandatory items
    helper.getByTestId("list-item-row").should("have.length", 2);
    // You want to search something else
    helper.getByTestId("search", "input").focus().type("agua");
    // You will see Agua and Aguacate
    helper.contains(agua.name);
    helper.contains(aguacate.name);
    helper.getByTestId("list-item-row").should("have.length", 2);
  });

  it("search ignoring accent marks", () => {
    const [beleten] = [...items].reverse();
    helper.goToAllItemsListView();
    helper.goToSearchView();
    helper.getByTestId("list-item-row").should("have.length", items.length);
    helper.getByTestId("search", "input").focus().type("beleten");
    helper.contains(beleten.name);
    helper.getByTestId("list-item-row").should("have.length", 1);
  });
});
