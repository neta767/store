import express, { json } from 'express';
import cors from 'cors'
import yargs from 'yargs/yargs';
import { CustomerController } from './controller/CustomerController';
import { Customer } from './model/Customer';
import { CustomerDao } from './dao/CustomerDto';
import { CustomerService } from './services/CustomerService';
import { CacheFactory } from 'algo/CacheFactory';

// this module is not testable!


////////////// Server config ////////////
// create express application (top level router)
const server = express();

////////////// Middleware //////////////
// add the "cors" middleware for *all* our
// routes to support HTTP calls from different domains
server.use(cors(), json());


///////////////// Read user preferred Cache algorithm ///////////////////////
const yargsArgv = yargs(process.argv.slice(2)).command('algo', 'Run server with algo cache', {
    algo: {
        description: 'Cache algorithms are optimizing instructions, or algorithms, that a computer program or a hardware-maintained structure can utilize in order to manage a cache of information stored on the computer.',
        alias: 'a'
    },
    capacity: {
        description: 'Cache algo capacity',
        alias: 'c',
    }
})
    .help()
    .parseSync();

const algoStr = <string>yargsArgv.algo;
const capacity = <number>yargsArgv.capacity;

const factory = new CacheFactory<number, Customer>()
const cacheAlgo = factory.clientCode(algoStr, capacity)

// Web API - Customer
// server.use(router);
// server.use(errorHandler)
const customerController = new CustomerController(server, new CustomerService(cacheAlgo, new CustomerDao()));

export default server;
