import { AbstractCacheAlgo, ICacheAlgo } from "./AbstractCacheAlgo";

export class SecondChance<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V>{
    #cache = new Map<K, V>();
    #orderedKeys: K[] = [];
    #secondChanceBits: boolean[] = [];
    #currRoundRobinIndex = 0;

    #cacheIsNotFull(): boolean {
        return this._capacity != this.#cache.size;
    }
    #incrementRoundRobinIndex(): void {
        this.#currRoundRobinIndex =
            (this.#currRoundRobinIndex + 1) % this._capacity;
    }
    #findKeyIndex(key: K): number {
        let index = 0;
        for (const currKey of this.#orderedKeys) {
            if (currKey == key)
                return index;
            index++;
        }
        throw "not found key";
    }
    #updateSecondChanceBitForKey(key: K, bit: boolean) {
        const keyIndex = this.#findKeyIndex(key);
        this.#secondChanceBits[keyIndex] = bit;
    }

    getElement(key: K): V | undefined {
        const foundedValue = this.#cache.get(key);
        if (foundedValue === undefined)
            return undefined;

        this.#updateSecondChanceBitForKey(key, true);
        return foundedValue;
    }

    hasKey(key: K): boolean {
        return this.#cache.has(key);
    }
    setNewElement(newKey: K, newValue: V): K | undefined {
        // is not full
        if (this.#cacheIsNotFull()) {
            this.#cache.set(newKey, newValue);
            this.#secondChanceBits.push(false);
            this.#incrementRoundRobinIndex();
            return;
        }

        //if cache is full

        while (this.#secondChanceBits[this.#currRoundRobinIndex] == true) {
            this.#secondChanceBits[this.#currRoundRobinIndex] = false;
            this.#incrementRoundRobinIndex();
        }
        const keyToReplace: K = this.#orderedKeys[this.#currRoundRobinIndex];
        this.#cache.delete(keyToReplace);
        this.#cache.set(newKey, newValue);
        this.#orderedKeys[this.#currRoundRobinIndex] = newKey;
        this.#incrementRoundRobinIndex();
    }

    removeElement(key: K): boolean {
        if (!this.#cache.has(key))
            return false;

        this.#cache.delete(key);

        const indx = this.#findKeyIndex(key);
        this.#orderedKeys.splice(indx, 1);
        this.#secondChanceBits.splice(indx, 1);

        if (indx <= this.#currRoundRobinIndex && this.#currRoundRobinIndex > 0) {
            this.#currRoundRobinIndex -= 1;
        }
        return true;
    }

}