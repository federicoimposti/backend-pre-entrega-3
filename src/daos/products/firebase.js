import firebaseProductsController from'../../controllers/firebase.js';

class firebaseDaoProductsController extends firebaseProductsController {
    constructor() {
        super('products');
    }
}

export default firebaseDaoProductsController;