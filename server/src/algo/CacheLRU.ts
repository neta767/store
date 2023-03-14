import { LinkedList as LinkedListWas } from 'linked-list-typescript';
import { AbstractCacheAlgo, ICacheAlgo } from "./AbstractCacheAlgo";

class KeyValue<K, V> {
    readonly key: K;
    readonly value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

// fixing library bug that can't remove one element in the list
class LinkedList<T> extends LinkedListWas<T> {
    remove(val: T): T {
        if (this.length == 1)
            return super.removeHead();
        else
            return super.remove(val);
    }
}

export class CacheLRU<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {
    #cacheMap = new Map<K, KeyValue<K, V>>();
    #keysList = new LinkedList<KeyValue<K, V>>();
    #isNotFull = () => this._capacity != this.#cacheMap.size;
    //TODO:fix
    getElement(key: K): V | any {
        const node = this.#cacheMap.get(key);
        if (node == undefined)
            return node;

        this.#keysList.remove(node);
        this.#keysList.append(node);

        return node.value;
    }

    removeElement(key: K): boolean {
        const node = this.#cacheMap.get(key);
        if (!node)
            return false;
        else {
            this.#keysList.remove(node);
            this.#cacheMap.delete(key);
            return true;
        }
    }

    hasKey(key: K): boolean {
        return this.#cacheMap.has(key);
    }

    setNewElement(key: K, value: V): K | undefined {
        if (this.#isNotFull()) {
            const newNode = new KeyValue(key, value);
            this.#cacheMap.set(key, newNode);
            this.#keysList.append(newNode);

            return;
        }
        const nodeToRemove = this.#keysList.head; // it is not empty for sure
        const keyToRemove = nodeToRemove.key;

        this.#keysList.remove(nodeToRemove);
        this.#cacheMap.delete(keyToRemove);

        const newNode = new KeyValue(key, value);
        this.#cacheMap.set(key, newNode);
        this.#keysList.append(newNode);
        return keyToRemove;
    }

    /**
     * methods for tests
     */
    getCacheKeys(): K[] {
        return [...this.#cacheMap.keys()];
    }

    getElementForTest(key: K): V | undefined {
        return this.#cacheMap.get(key)?.value;
    }

    /////
}