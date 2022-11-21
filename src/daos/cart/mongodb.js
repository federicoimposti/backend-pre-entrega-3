import MongodbCartController from'../../controllers/mongodb.js';
import { Cart } from "../../controllers/models/Cart.js";
import logger from '../../logs/logger.js';

class mongodbDaoCartController extends MongodbCartController {
    constructor() {
        super(Cart);
    }

    async save() {
        try {
            const carts = await super.getAll();
            const cart = {
                timestamp: Date.now(),
                productos: []
            }

            if (!carts || !carts.length) {
                cart.id = 1;
                return await super.save(cart);
            }

            const lastCart = carts.slice(-1);

            cart.id = parseInt(lastCart[0]?.id) + 1

            return await super.save(cart);
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async deleteById(id) {
        try {
            const item = await this.schema.findOneAndDelete({ id });

            if (!item) {
                return;
            }

            return item;
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error eliminando el producto.', err);
        }
    }
}

export default mongodbDaoCartController;