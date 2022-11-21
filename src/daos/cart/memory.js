import memory from'../../controllers/memory.js';
import logger from '../../logs/logger.js';
import fs from 'fs';

class MemoryCartController extends memory {
    constructor(file) {
        super(file);
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
                this.memory = [cart];

                return cart.id.toString();
            }

            const lastCart = carts.slice(-1);

            cart.id = parseInt(lastCart[0]?.id) + 1

            const addCart = [...carts, cart];
            this.memory =  addCart;

            return cart.id.toString();
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }
}

export default MemoryCartController;