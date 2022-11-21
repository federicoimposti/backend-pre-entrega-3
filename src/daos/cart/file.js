import logger from '../../logs/logger.js';
import file from'../../controllers/file.js';
import fs from 'fs';

class FileCartController extends file {
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
                await fs.promises.writeFile(this.file, JSON.stringify([cart], null, 2));

                return cart.id.toString();
            }

            const lastCart = carts.slice(-1);

            cart.id = parseInt(lastCart[0]?.id) + 1

            const addCart = [...carts, cart];
            await fs.promises.writeFile(this.file, JSON.stringify(addCart, null, 2));

            return cart.id.toString();
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }
}

export default FileCartController;