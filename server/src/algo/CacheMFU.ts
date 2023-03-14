import { AbstractCacheAlgo, ICacheAlgo } from "./AbstractCacheAlgo";

export class CacheMFU<K,V> extends AbstractCacheAlgo<K,V> implements ICacheAlgo<K,V>{
    #cache = new Map<K,V>(); 
    #frequencyMap = new Map<K,number>();
    #incrementFrequencyOfKey = (key:K)=>{this.#frequencyMap.set(key, this.#frequencyMap.get(key)! +1 )};

    #isNotFull = () => this._capacity != this.#cache.size;

    getElement(key: K): V | undefined {
        const res = this.#cache.get(key);
        if (res!=undefined){
            this.#incrementFrequencyOfKey(key);
        }
        return res;
    }

    removeElement(key: K): boolean {
        this.#frequencyMap.delete(key);
        return this.#cache.delete(key);
    }

    hasKey(key: K): boolean {
        return this.#cache.has(key);
    }

    setNewElement(key: K, value: V): K | undefined {
        if (this.#isNotFull()){
            this.#cache.set(key, value);
            this.#frequencyMap.set(key, 1);
            return;
        }
        
        let maxCount = -1;
        let mostFrequentKey:K;
        this.#frequencyMap.forEach((count, key) => {
            if (count > maxCount){
                maxCount = count;
                mostFrequentKey = key;
            }
        });
        this.removeElement(mostFrequentKey!);
        this.#cache.set(key, value);
        this.#frequencyMap.set(key, 1);
        return mostFrequentKey!;
    }
}