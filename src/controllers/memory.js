import fs from 'fs';
const error = { error: 'Producto no encontrado' };

class memoryController {
    constructor(memory) {
        this.memory = memory;
    }

    async save(obj) {
        try {
            const items = await this.getAll();
            obj.timestamp = Date.now();

            if (!items || !items.length) {
                obj.id = 1;
                this.memory.push(obj);

                return this.memory;
            }

            const lastItem = items.slice(-1);
            obj.id = parseInt(lastItem[0]?.id) + 1;
            
            const addItem = [...items, obj];
            this.memory = addItem;
            return addItem;
        } catch (err) {
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
            throw new Error('Ocrrió un error obteniendo el producto.', err);
        }
    }

    async getAll() {
        try {
            const items = this.memory;
            return items ? items : null;
        } catch(err) {
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
            this.memory = itemsFiltered;
        } catch (err) {
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

            this.memory = items;
            } else {
                return error;
            }
        } catch (err) {
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

            this.memory = cartsFiltered;
        } catch (err) {
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

            this.memory = carts;

            return obj.id?.toString();
        } catch (err) {
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }
}

export default memoryController;