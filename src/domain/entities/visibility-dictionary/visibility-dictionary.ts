export type RawVisibilityDictionary = Record<string, boolean>;
export class VisibilityDictionary {
  constructor(private readonly dict: RawVisibilityDictionary = {}) {
    this.dict = { ...dict };
  }

  clone() {
    return new VisibilityDictionary(this.values);
  }

  get(key: string) {
    return Boolean(this.dict[key]);
  }

  has(key: string) {
    return this.dict[key] !== undefined;
  }

  set(key: string, value: boolean) {
    this.dict[key] = value;
  }

  toggle(key: string) {
    if (this.has(key)) {
      this.set(key, !this.get(key));
    } else {
      this.set(key, true);
    }
  }

  get values(): RawVisibilityDictionary {
    return {
      ...this.dict,
    };
  }
}
