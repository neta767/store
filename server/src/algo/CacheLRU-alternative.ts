import { throws } from "assert";
import { AbstractCacheAlgo, ICacheAlgo } from "./AbstractCacheAlgo";

interface INode{ 
    // this interface is for LinkedList generalization
    next:INode | null;
    prev:INode | null;
}
export class LinkedList<N extends INode> {
    #head:N | null;
    #tail:N | null;
    constructor() {
        this.#head = null
        this.#tail = null;
    }
    addToTail(node:N){ 
        node.next = null; //reset
        node.prev =null; //reset
        if (this.#tail == null){
            this.#tail = node; // first element in linked list
            this.#head = node;
        }else{
            node.prev = this.#tail;
            this.#tail.next = node;
            this.#tail = node;
        }
    }
    getTailNode(): N | null{
        return this.#tail;
    }
    getHeadNode(): N | null{
        return this.#head;
    }
    removeNode(node:N){
        
        if (this.#tail==null)
            return

        const prevNode = node.prev;
        const nextNode = node.next;

        if (this.#head == node ){ 
            this.#head = node.next as N;
            return; 
        }

        prevNode!.next = nextNode;
        if (nextNode!=null)
            nextNode.prev = prevNode;
        if (node==this.#tail)
            this.#tail = prevNode as N;
    }
    
    toArray(){
        let curr = this.#head;
        let res = [];
        while (curr){
            res.push(curr.toString())
            curr = curr.next as N;
        }
        return res;
    }
}
export class Node<K,V> implements INode{
    key:K;
    value:V;
    next:Node<K,V> | null;
    prev:Node<K,V> | null;
    constructor(key:K, value:V){
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;  
    }
    toString(){
        return this.key;
    }
}
 
class CacheLRU<K,V> extends AbstractCacheAlgo<K,V> implements ICacheAlgo<K,V>{

    #cacheMap = new Map<K, Node<K,V>>(); 
    #keysList = new LinkedList<Node<K,V>>();
    #isNotFull = () => this._capacity != this.#cacheMap.size;

    getElement(key: K): V | undefined {
        const node = this.#cacheMap.get(key);
        if (node==undefined)
            return node;

        this.#keysList.removeNode(node);
        this.#keysList.addToTail(node);        

        return node.value;
    }
    
    removeElement(key: K): boolean {
        const node = this.#cacheMap.get(key);
        if (!node)
            return false;
        else{
            this.#keysList.removeNode(node);
            this.#cacheMap.delete(key);
            return true;
        }
    }

    hasKey(key: K): boolean {
        return this.#cacheMap.has(key);
    }

    setNewElement(key: K, value: V): K | undefined {
        if (this.#isNotFull()){
            const newNode = new Node(key, value);
            this.#cacheMap.set(key, newNode);
            this.#keysList.addToTail(newNode);
            return;
        }
        const nodeToRemove = this.#keysList.getHeadNode()!; // it is not empty for sure
        const keyToRemove = nodeToRemove.key;
        
        // console.log(keyToRemove, this.#keysList.toArray());
        this.#keysList.removeNode(nodeToRemove);
        // console.log('removed', keyToRemove, this.#keysList.toArray());

        this.#cacheMap.delete(keyToRemove);
        // nodeToRemove.key = null!; // for garbage collector
        // nodeToRemove.value = null!; // for garbage collector

        const newNode = new Node(key, value);
        this.#cacheMap.set(key, newNode);
        this.#keysList.addToTail(newNode);
        return keyToRemove;
    }

    /**
     * methods for tests
     */
    getCacheKeys(): K[]{
        return [...this.#cacheMap.keys()];
    }
    getElementForTest(key:K) : V | undefined{
        return this.#cacheMap.get(key)?.value;
    }
    /////

}