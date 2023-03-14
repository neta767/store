
abstract class CrudDao <T>{
    constructor() {
    }

    abstract add(t: T): Promise<boolean>;
    abstract remove(t: T): boolean;
    abstract find(id: number): Promise<T> ;
}

export {CrudDao};