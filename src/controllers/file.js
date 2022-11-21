import fs from 'fs';
import logger from '../logs/logger.js';

const error = { error: 'Producto no encontrado' };

class fileController {
    constructor(file) {
        this.file = file;
    }

    async save(obj) {
        try {
            const items = await this.getAll();

            if (!items || !items.length) {
                obj.id = 1;
                await fs.promises.writeFile(this.file, JSON.stringify([obj], null, 2));

                return obj.id.toString();
            }

            const lastItem = items.slice(-1);
            obj.id = parseInt(lastItem[0]?.id) + 1;
            obj.timestamp = Date.now();
            
            const addItem = [...items, obj];
            await fs.promises.writeFile(this.file, JSON.stringify(addItem, null, 2));

            return obj.id.toString();
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async getById(id) {
        try {
            const items = await this.getAll();

            if (!items) {
                return error;
            }

            const item = items.find(item => item.id === id);
            return item ? item : error;
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocrrió un error obteniendo el producto.', err);
        }
    }

    async getAll() {
        try {
            const items = await fs.promises.readFile(this.file, 'utf-8');
            return items ? JSON.parse(items) : null;
        } catch(err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error obteniendo los productos.', err);
        }
    }

    async deleteById(id) {
        try {
            const items = await this.getAll();

            if (!items) {
                return;
            }

            const itemsFiltered = items.filter(item => item.id !== id);
            await fs.promises.writeFile(this.file, JSON.stringify(itemsFiltered, null, 2));
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error eliminando el producto.', err);
        }
        
    }

    async update(id, newData) {
        try {
            const { title, price, thumbnail } = newData;
            const itemId = id;

            const item = await this.getById(itemId);
            const items = await this.getAll();
        
            if(item?.id){
                items.forEach(item => {
                    const id = item.id;
                    if(itemId === id){
                        item.title = title;
                        item.price = price;
                        item.thumbnail = thumbnail;
                    }
                });

            await fs.promises.writeFile(this.file, JSON.stringify(items, null, 2));
            } else {
                return error;
            }
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error ('Ocurrió un error actualizando el producto.', err);
        }
      };

      async deleteByIdCartAndIdProduct(cartId, productId) {
        try {
            const productIdFormatted = parseInt(productId);
            const carts = await this.getAll();
            const cart = carts.find(cart => cart.id === cartId);

            if (!cart) {
                return error;
            }
            
            const cartsFiltered = carts.map(cartItem => {
                if(cartItem.id == cartId) {
                    const productsFiltered = cartItem.productos.filter(product => product.id != productIdFormatted );
                    const cartFiltered = {
                        timestamp: cartItem?.timestamp,
                        id: cartItem?.id,
                        products: productsFiltered,
                    }

                    return cartFiltered;
                }

                return cartItem ? cartItem : [];
            });

            await fs.promises.writeFile(this.file, JSON.stringify(cartsFiltered, null, 2));
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async getProductsInCart(id) {
        try {
            const cart = await this.getById(id);            
            const productsInCart = cart.productos;

            if(!productsInCart?.length){
                return error;
            }

            return productsInCart ?? null;
        } catch(err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error obteniendo los carritos.', err);
        }
    }

    async saveProductInCart(obj, id) {
        try {
            const carts = await this.getAll();
            const cart = carts.find(cart => cart.id === id);    

            if (!cart) {
                return error;
            }

            obj.timestamp = Date.now();

            carts.forEach(cartItem => {
                if(cartItem.id == id) {
                    cartItem.productos.push(obj);
                }
            });

            await fs.promises.writeFile(this.file, JSON.stringify(carts, null, 2));

            return obj.id?.toString();
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }
}

export default fileController;