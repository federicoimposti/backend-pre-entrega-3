import mongoose from 'mongoose';
import { User } from './models/User.js'; 
import bcrypt from 'bcrypt';

const error = { error: 'Producto no encontrado' };

const uri = "mongodb+srv://fimposti:CoderHouse27@hms.i5ds7.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect(uri);
    console.log('Successful database connection');
  } catch (err) {
    throw new Error('Ocurrió un error al conectarse a la base de datos.', err);
  }  


class MongodbController {
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
            const cart = await this.schema.findOne({ id: cartId });
            const productIdFormatted = productId.toString();

            if (!cart) {
                return error;
            }
            
            cart.updateOne(({$id: cartId}, { $pull: { productos: { id: productIdFormatted} }}), (error) => {
                if (error) {
                    console.log(error);
                }
            });
        } catch (err) {
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async getProductsInCart(id) {
        try {
            const cart = await this.schema.findOne({ id })
            const productsInCart = cart.productos;

            if(!productsInCart?.length){
                return error;
            }

            return productsInCart;
        } catch(err) {
            throw new Error('Ocurrió un error obteniendo los carritos.', err);
        }
    }

    async saveProductInCart(obj, id) {
        try {
            const item = await this.schema.findOne({ id: id })

            if (!item) {
                return error;
            }

            obj.timestamp = Date.now();

            item.updateOne(({$id: id}, { $push: { productos: obj }}), (error) => {
                if (error) {
                    console.log(error);
                }
            });
        } catch (err) {
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async saveUser(user) {
        const newUser = new User(user); 
        try {
          const userExist = await User.findOne({email: user.email});
          if (userExist) { 
            return false; 
          } else { 
            const hashPass = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashPass; 
            await newUser.save();
            return newUser; 
          } 
        } catch (error) {
          console.log(error);
        }
      }
}

export default MongodbController;