import { AbstractCacheAlgo, ICacheAlgo } from "./AbstractCacheAlgo";

export class CacheRandom<K,V> extends AbstractCacheAlgo<K,V> implements ICacheAlgo<K,V>{
    private map = new Map<K,V>();
    private isNotFull = () => this._capacity != this.map.size;

    // returns random number from 0 to size-1
    private getRandomIndex = () => Math.floor(Math.random() * this.map.size);

    getElement(key: K): V | undefined {
        return this.map.get(key);
    }
    
    hasKey(key: K): boolean {
        return this.map.has(key);
    }
    setNewElement(key: K, value: V): K | undefined {
        if ( this.isNotFull()){            
            this.map.set(key, value);
            return;
        }
         
        const randomIndex = this.getRandomIndex(); 
        const randomKey = [...this.map.keys()][randomIndex];
        this.removeElement(randomKey);
        this.map.set(key, value);
        return randomKey;
    }

    removeElement(key: K): boolean {
        return this.map.delete(key);
    }
}