import fs from 'fs';
import mongoose from 'mongoose';

const error = { error: 'Producto no encontrado' };

const uri = "mongodb+srv://fimposti:CoderHouse27@hms.i5ds7.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect(uri);
    console.log('Successful database connection');
  } catch (err) {
    throw new Error('Ocurrió un error al conectarse a la base de datos.', err);
  }  


class MongodbProductsController {
    constructor(schema) {
        this.schema = schema;
    }

    async save(obj) {
        try {
            obj.timestamp = Date.now();
            const newObj = new this.schema(obj);
            const data = await newObj.save();
            return data;
        } catch (err) {
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async getById(id) {
        try {
            const items = await this.schema.find({});

            if (!items) {
                return error;
            }

            const item = await this.schema.findOne({ codigo: id })
            return item ? item : error;
        } catch (err) {
            throw new Error('Ocrrió un error obteniendo el producto.', err);
        }
    }

    async getAll() {
        try {
            const items = await this.schema.find({});      
            return items;
        } catch(err) {
            throw new Error('Ocurrió un error obteniendo los productos.', err);
        }
    }

    async deleteById(id) {
        try {
            const item = await this.schema.findOneAndDelete({ codigo: id });

            if (!item) {
                return;
            }

            return item;
        } catch (err) {
            throw new Error('Ocurrió un error eliminando el producto.', err);
        }
        
    }

    async update(id, newData) {
        try {
            const item = await this.schema.findOneAndUpdate({ codigo: id }, newData);
            return item;
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

            await fs.promises.writeFile(this.file, JSON.stringify(cartsFiltered, null, 2));
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

            await fs.promises.writeFile(this.file, JSON.stringify(carts, null, 2));

            return obj.id?.toString();
        } catch (err) {
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }
}

export default MongodbProductsController;