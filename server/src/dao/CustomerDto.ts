import { createConnection } from "../config";
import { CrudDao } from "./Dao"
import { Customer } from "../model/Customer"

class CustomerDao extends CrudDao<Customer> {

    client: any;

    constructor() {
        super();
        this.client = createConnection();
    }

    async add(t: Customer): Promise<boolean> {
        console.log('hi')
        const query = {
            text: 'INSERT INTO persons(lastname, firstname, address, city) VALUES ($1, $2, $3, $4);',
            values: [t.lastname, t.firstname, t.address, t.city]
        }
        var res = await this.client.query(query)
            .catch((e: { stack: any; }) => {
                throw e
            })
        return true;
    }

    remove(t: Customer): boolean {
        throw new Error("Method not implemented.")
    }

    async find(id: number): Promise<Customer> {
        const query = {
            text: 'SELECT * FROM persons WHERE id = $1',
            values: [id]
        }

        var res = await this.client.query(query)
            .catch((e: { stack: any; }) => console.error(e.stack))
        return new Customer(res.rows[0].id,
            res.rows[0].lastname,
            res.rows[0].firstname,
            res.rows[0].address,
            res.rows[0].city);
    }
}

export { CustomerDao };
