import { CrudDao } from "../dao/Dao";
import { Customer } from "../model/Customer";
import { CustomerDao } from "../dao/CustomerDao";
import { ICacheAlgo } from "../algo/AbstractCacheAlgo";

class CustomerService {
    customerDao: CrudDao<Customer>;
    algoCache: ICacheAlgo<number, Customer>;

    constructor(algoCache: ICacheAlgo<number, Customer>, customerDao: CustomerDao) {
        this.customerDao = customerDao;
        this.algoCache = algoCache;
    }

    async create(resource: Customer) {
        return this.customerDao.add(resource);
    }

    async readById(id: number) {
        let customer = this.algoCache.getElement(id);
        if (customer !== undefined) {
            return customer;
        }
        customer = await this.customerDao.find(id);
        //TODO: update db
        let customerCache = this.algoCache.setElement(customer.id, customer);
        // this.customerDao.add(customerCache)
        return customer;
    }

    async getCustomerPurchasesList() {

    }

    async getPurchasesSum(body: number) {

    }
}

export { CustomerService };