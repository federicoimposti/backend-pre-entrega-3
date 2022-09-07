import * as dotenv from 'dotenv';
dotenv.config();

import fileController from './products/file.js';

let productsDao;
let cartDao;

switch (process.env.PERS) {
    case 'file':
        productsDao = new fileController('./volumes/products.txt');
        break;

    default:
        break;
}

export default productsDao;