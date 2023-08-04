export class IndexedDBTestHelper {
  private constructor(private db: IDBDatabase) {}

  static async clearIndexedDB() {
    const databases = await window.indexedDB.databases();

    return Promise.all(
      databases.map((db) =>
        this.handleIndexedDBRequest(window.indexedDB.deleteDatabase(db.name!))
      )
    );
  }

  private static handleIndexedDBRequest(request: IDBOpenDBRequest) {
    return new Promise((resolve, reject) => {
      request.addEventListener("success", resolve);
      request.addEventListener("blocked", resolve);
      request.addEventListener("error", reject);
    });
  }
}
