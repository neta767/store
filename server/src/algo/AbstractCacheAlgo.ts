export interface ICacheAlgo<K, V> {
  getElement(key: K): V | undefined;
  setElement(key: K, value: V): K | undefined;
  removeElement(key: K): void;
}

export abstract class AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V>{
  protected _capacity: number;

  constructor(capacity: number) {
    this._capacity = capacity;
  }
  
  abstract getElement(key: K): V | undefined;
  abstract removeElement(key: K): boolean; //if element doesn't exist return false

  // bonus code (Template pattern)
  setElement(key: K, value: V): K | undefined {
    if (this.hasKey(key)) {
      this.removeElement(key);
      this.setNewElement(key, value);
      return key;
    } else {
      return this.setNewElement(key, value);
    }

  }
  abstract hasKey(key: K): boolean;
  abstract setNewElement(key: K, value: V): K | undefined;
}
