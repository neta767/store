import express from 'express';
import { CustomerService } from '../services/CustomerService';

class CustomerController {

    server: express.Application;
    userService: CustomerService;

    constructor(server: express.Application, userService: CustomerService) {
        this.server = server;
        this.userService = userService;
        this.configureRoutes();
    }

    configureRoutes() {
        this.server.get('/user', async (req, res) => {
            const user = await this.userService.readById(req.body.id);
            res.status(200).send(user);
        });
        this.server.post('/user', async (req, res) => {
            const user = await this.userService.create(req.body);
            res.status(201).send(user);
        });
        this.server.get('/user/purchases', async (req, res) => {
            const user = await this.userService.getCustomerPurchasesList();
            res.status(200).send(user);
        });
        this.server.get('/purchasesSum', async (req, res) => {
            const user = await this.userService.getPurchasesSum(req.body.id);
            res.status(200).send(user);
        });
    }

    // async getUserById(req: Request, res: Response) {
    //     const user = await this.userService.readById(req.body.id);
    //     res.status(200).send(user);
    // }

    // async createUser(req: Request, res: Response) {
    //     const body = this.userService.create(req.body);
    //     res.status(201).send({ body: body });
    // }

}


export { CustomerController }