import MongodbProductsController from'../../controllers/mongodb.js';
import { Products } from "../../controllers/models/Products.js"; 

class mongodbDaoProductsController extends MongodbProductsController {
    constructor() {
        super(Products);
    }
}

export default mongodbDaoProductsController;