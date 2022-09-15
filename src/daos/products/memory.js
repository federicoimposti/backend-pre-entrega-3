import memory from'../../controllers/memory.js';
import {productos} from '../../../volumes/memory.js';

class memoryController extends memory {
    constructor() {
        super(productos);
    }
}

export default memoryController;