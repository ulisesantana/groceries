import { Item, RawItem } from "../item";
import { Id } from "../id";
import { Category } from "../category";

type CategoryName = string;

export class ItemList {
  private readonly _items: Item[];
  constructor(items: Item[]) {
    this._items = [...items].sort(ItemList.sortByName);
  }

  private get items() {
    return [...this._items];
  }

  static groupItemsByCategory(items: Item[]): Array<[Category, Array<Item>]> {
    return Object.entries(
      items.reduce((dictionary, item) => {
        if (dictionary[item.category.name]) {
          dictionary[item.category.name] =
            dictionary[item.category.name].concat(item);
        } else {
          dictionary[item.category.name] = [item];
        }
        return dictionary;
      }, {} as Record<CategoryName, Item[]>)
    )
      .sort(([a], [b]) => ItemList.sortAsc(a, b))
      .map(([_category, items]) => [items.at(0)!.category, items]);
  }

  private static sortByName<T extends { name: string }>(a: T, b: T) {
    return ItemList.sortAsc(a.name, b.name);
  }

  private static sortAsc<T = number | string>(a: T, b: T) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  get values() {
    return this.items;
  }

  getAllRequired() {
    return this.items.filter((i) => i.isRequired);
  }

  getAllMandatory() {
    return this.items.filter((i) => i.isMandatory && i.isRequired);
  }

  search(search: string): ItemList {
    return new ItemList(
      this.items.filter((i) =>
        this.removeAccentMarks(i.name.toLowerCase()).includes(
          this.removeAccentMarks(search.toLowerCase())
        )
      )
    );
  }

  findById(id: Id): Item | undefined {
    return this._items.find((item) => id.equals(item.id));
  }

  has(item: Item): boolean {
    return this._items.some(({ id }) => item.id.equals(id));
  }

  toRaw(): RawItem[] {
    return this.values.map((item) => ({
      id: item.id.value,
      category: item.category.id.value,
      name: item.name,
      isRequired: item.isRequired,
      isMandatory: item.isMandatory,
      quantity: item.quantity,
    }));
  }

  // https://javascriptf1.com/snippet/remove-accents-from-a-string-in-javascript
  private removeAccentMarks(text: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
