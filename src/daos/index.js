import * as dotenv from 'dotenv';
dotenv.config();

import fileController from './products/file.js';
import FileCartController from './cart/file.js';
import memoryController from './products/memory.js';
import memoryCartController from './cart/memory.js';
import mongodbDaoProductsController from './products/mongodb.js';
import mongodbDaoCartController from './cart/mongodb.js';
import mongodbDaoUsersController from './users/mongodb.js';
import firebaseDaoProductsController from './products/firebase.js';
import firebaseDaoCartController from './cart/firebase.js';

let productsDao;
let cartDao;
let usersDao;

switch (process.env.PERS) {
    case 'file':
        productsDao = new fileController('./volumes/products.txt');
        cartDao = new FileCartController('./volumes/cart.txt');
        break;

    case 'mongodb':
        productsDao = new mongodbDaoProductsController();
        cartDao = new mongodbDaoCartController();
        usersDao = new mongodbDaoUsersController();
        break;
    
    case 'firebase':
        productsDao = new firebaseDaoProductsController();
        cartDao = new firebaseDaoCartController();
    break;

    case 'memory':
        productsDao = new memoryController();
        cartDao = new memoryCartController();
    break;

    default:
        break;
}

export { productsDao, cartDao, usersDao };