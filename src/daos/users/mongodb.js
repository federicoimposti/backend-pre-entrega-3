import MongodbController from'../../controllers/mongodb.js';
import { User } from "../../controllers/models/User.js"; 

class mongodbDaoUsersController extends MongodbController {
    constructor() {
        super(User);
    }
}

export default mongodbDaoUsersController;