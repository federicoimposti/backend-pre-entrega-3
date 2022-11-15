import express from 'express';
import auth from '../../middlewares/auth.js';
import { User } from '../../controllers/models/User.js'; 

const homeRouter = express.Router();

homeRouter.get("/", auth, async (req, res) => {
    const { username, image } = await User.findById(req.user._id);
    res.render('pages/home', {
        user: username,
        image,
      });
});
  
export default homeRouter;