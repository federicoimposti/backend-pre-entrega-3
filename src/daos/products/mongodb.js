import MongodbController from'../../controllers/mongodb.js';
import { Products } from "../../controllers/models/Products.js"; 

class mongodbDaoProductsController extends MongodbController {
    constructor() {
        super(Products);
    }
}

export default mongodbDaoProductsController;