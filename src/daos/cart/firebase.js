import firebaseProductsController from'../../controllers/firebase.js';
import logger from '../../logs/logger.js';

class firebaseDaoProductsController extends firebaseProductsController {
    constructor() {
        super('cart');
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

            carts.sort(function(a, b) {
                return a.id-b.id;
            });

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
            const itemToDeleted = await this.query.where('id', '==', id).get();

            itemToDeleted.forEach(item => {
                item.ref.delete();
            });
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error eliminando el producto.', err);
        }
    }
}

export default firebaseDaoProductsController;