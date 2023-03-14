import { ICacheAlgo } from "./AbstractCacheAlgo";
import { CacheFIFO } from "./CacheFIFO";
import { CacheLRU } from "./CacheLRU";
import { CacheRandom } from "./CacheRandom";

/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class CacheCreator<K, V> {
    /**
     * Note that the Creator may also provide some default implementation of the
     * factory method.
     */
    public abstract createCache(capacity: number): ICacheAlgo<K, V>;
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class CacheFIFOCreator<K, V> extends CacheCreator<K, V> {
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
    public createCache(capacity: number): ICacheAlgo<K, V> {
        return new CacheFIFO<K, V>(capacity);
    }
}

class CacheLRUCreator<K, V> extends CacheCreator<K, V> {
    public createCache(capacity: number): ICacheAlgo<K, V> {
        return new CacheLRU<K, V>(capacity);
    }
}

class CacheRandomCreator<K, V> extends CacheCreator<K, V> {
    public createCache(capacity: number): ICacheAlgo<K, V> {
        return new CacheRandom<K, V>(capacity);
    }
}


export class CacheFactory<K, V> {
    map: Map<string, CacheCreator<K, V>>

    constructor() {
        this.map = new Map<string, CacheCreator<K, V>>()
        this.map.set('fifo', new CacheFIFOCreator<K, V>())
        this.map.set('random', new CacheRandomCreator<K, V>())
        this.map.set('lfu', new CacheLRUCreator<K, V>())
    }

    /**
     * The client code works with an instance of a concrete creator, albeit through
     * its base interface. As long as the client keeps working with the creator via
     * the base interface, you can pass it any creator's subclass.
     */
    public clientCode<K, V>(creatorStr: string, capacity: number) {
        const creator = this.map.get(creatorStr)
        if (creator === undefined) {
            throw new Error("Can't find cache type");
        }
        return creator.createCache(capacity)
    }
}