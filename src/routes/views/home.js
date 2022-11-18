import express from 'express';
import auth from '../../middlewares/auth.js';
import { User } from '../../controllers/models/User.js';
import { productsDao } from '../../daos/index.js';

const homeRouter = express.Router();

homeRouter.get("/", auth, async (req, res) => {
    const { username, image, carrito } = await User.findById(req.user._id);
    const products = await productsDao.getAll();

    res.render('pages/home', {
        user: username,
        image,
        products,
        cartId: carrito
      });
});
  
export default homeRouter;