import { LocalStorage, LocalStorageCollection } from "../data-sources";
import { Views } from "../ui/components";

export class ActiveViewRepository {
  private static ls = new LocalStorage<Views>(
    LocalStorageCollection.ActiveView
  );

  static read() {
    return this.ls.get() || Views.All;
  }

  static write(view: Views) {
    return this.ls.set(view);
  }
}
