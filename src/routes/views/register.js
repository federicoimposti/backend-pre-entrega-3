import express from 'express';
import upload from '../../middlewares/multer.js';

import { usersDao } from '../../daos/index.js';

const register = express.Router();

register.get("/", (req, res) => {
    res.render('pages/register');
});

register.post("/", upload.single("myFile"), (req, res) => {
  const { filename } = req.file;
  const image = filename;
  
  const { username, password, email, edad, direccion, telefono } = req.body;
  usersDao.saveUser({ 
        username, 
        password, 
        email, 
        edad, 
        direccion, 
        image,
        telefono
    }) 
    .then (user => {
      if (user) {
        return res.render('pages/succes')
      } else {
        res.render('pages/error', { error: 'Usuario ya registrado', url: 'register' }) 
      }      
    })
});

export default register;