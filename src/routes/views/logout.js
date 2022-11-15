import express from 'express';
import { User } from '../../controllers/models/User.js';

const logout = express.Router();

logout.get("/", async (req, res) => {
  const { username } = await User.findById(req.user._id);  
  req.session.destroy((err) => { 
    if (!err) res.render('pages/logout', { username }); 
    else res.send("Error");
  });
});

export default logout;