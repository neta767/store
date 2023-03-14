import { AbstractCacheAlgo, ICacheAlgo } from "./AbstractCacheAlgo";

export class CacheFIFO<K,V> extends AbstractCacheAlgo<K,V> implements ICacheAlgo<K,V>{
    private map = new Map<K,V>();

    // helper functions
    private isNotFull = () => this._capacity != this.map.size;
    //

    getElement(key: K): V | undefined {
        return this.map.get(key);
    }

    hasKey(key: K): boolean {
        return this.map.has(key);
    }
    
    setNewElement(key: K, value: V): K | undefined {
        if (this.isNotFull()){
            this.map.set(key,value);
            return;
        }
        const firstKey = this.map.keys().next().value; 
        this.map.delete(firstKey);
        this.map.set(key, value);
        return firstKey;
    }

    removeElement(key: K): boolean {
        return this.map.delete(key);
    }

}