import express from 'express';

let router = express.Router();

import productsRouter from './products.js';
//import carritoRouter from './cart.js';

router.use('/productos', productsRouter);
// router.use('/carrito', carritoRouter);

export { router };