import express from 'express';
import logger from '../../logs/logger.js';

let apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    logger.info(`API LOG: Ruta: '${req.originalUrl}' - Método '${req.method}'`);
    next();
});

import productsRouter from './products.js';
import carritoRouter from './cart.js';

apiRouter.use('/productos', productsRouter);
apiRouter.use('/carrito', carritoRouter);

export { apiRouter };