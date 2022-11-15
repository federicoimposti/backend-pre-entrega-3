import express from 'express';

let apiRouter = express.Router();

import productsRouter from './products.js';
import carritoRouter from './cart.js';

apiRouter.use('/productos', productsRouter);
apiRouter.use('/carrito', carritoRouter);

export { apiRouter };