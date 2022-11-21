import express from 'express';
import homeRouter from './home.js';
import cartRouter from './cart.js';
import userRouter from './user.js';
import register from './register.js';
import login from './login.js';
import loginError from './loginError.js';
import logout from "./logout.js";
import logger from '../../logs/logger.js';

let viewsRouter = express.Router();

viewsRouter.use((req, res, next) => {
    logger.info(`Ruta: '${req.originalUrl}' - Método '${req.method}'`);
    next();
});

viewsRouter.use('/', homeRouter);
viewsRouter.use('/cart', cartRouter);
viewsRouter.use('/user', userRouter);
viewsRouter.use('/register', register);
viewsRouter.use('/login-error', loginError);
viewsRouter.use('/login', login);
viewsRouter.use('/logout', logout);

export { viewsRouter };