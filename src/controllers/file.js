import fs from 'fs';
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
            const items = await fs.promises.readFile(this.file, 'utf-8');
            return items ? JSON.parse(items) : null;
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
            await fs.promises.writeFile(this.file, JSON.stringify(itemsFiltered, null, 2));
        } catch (err) {
            throw new Error('Ocurrió un error eliminando el producto.', err);
        }
        
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2));
        } catch (err) {
            throw new Error ('Ocurrió un error eliminando los productos.', err);
        }
        
    }

    async update(id, newData) {
        try {
            const { nombre, price, foto } = newData;
            const itemId = id;

            const item = await this.getById(itemId);
            const items = await this.getAll();
        
            if(item?.id){
                items.forEach(item => {
                    const id = item.id;
                    if(itemId === id){
                        item.nombre = nombre;
                        item.price = price;
                        item.foto = foto;
                    }
                });

            await fs.promises.writeFile(this.file, JSON.stringify(items, null, 2));
            } else {
                return error;
            }
        } catch (err) {
            throw new Error ('Ocurrió un error actualizando el producto.', err);
        }
      };
}

export default fileController;