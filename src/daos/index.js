import * as dotenv from 'dotenv';
dotenv.config();

import fileController from './products/file.js';
import FileCartController from './cart/file.js';
import mongodbDaoProductsController from './products/mongodb.js';
import mongodbDaoCartController from './cart/mongodb.js';
import firebaseDaoProductsController from './products/firebase.js';
import firebaseDaoCartController from './cart/mongodb.js';

let productsDao;
let cartDao;

switch (process.env.PERS) {
    case 'file':
        productsDao = new fileController('./volumes/products.txt');
        cartDao = new FileCartController('./volumes/cart.txt');
        break;

    case 'mongodb':
        productsDao = new mongodbDaoProductsController();
        cartDao = new mongodbDaoCartController();
        break;
    
    case 'firebase':
        productsDao = new firebaseDaoProductsController();
    break;

    default:
        break;
}

export { productsDao, cartDao };