export class Customer {
    id: number;
    lastname: string;
    firstname: string;
    address: string;
    city: string;

    constructor(id: number = -1, lastname: string = "", firstname: string = "", address: string = "", city: string = "") {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.address = address;
        this.city = city;
    }
}