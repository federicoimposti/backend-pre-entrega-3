import * as dotenv from 'dotenv';
dotenv.config();

import fileController from './products/file.js';
import FileCartController from './cart/file.js';

let productsDao;
let cartDao;

switch (process.env.PERS) {
    case 'file':
        productsDao = new fileController('./volumes/products.txt');
        cartDao = new FileCartController('./volumes/cart.txt');
        break;

    default:
        break;
}

export { productsDao, cartDao };