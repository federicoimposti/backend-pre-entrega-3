import express from 'express';
import auth from '../../middlewares/auth.js';
import { User } from '../../controllers/models/User.js';

const userRouter = express.Router();

userRouter.get("/", auth, async (req, res) => {
    const { username, image, email, telefono, direccion, edad } = await User.findById(req.user._id);

    res.render('pages/user', {
        user: username,
        image,
        email, 
        telefono, 
        direccion, 
        edad
      });
});
  
export default userRouter;