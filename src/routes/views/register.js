import express from 'express';
import upload from '../../middlewares/multer.js';
import transporter from '../../middlewares/nodemailer.js';
import { usersDao, cartDao } from '../../daos/index.js';

const register = express.Router();

register.get("/", (req, res) => {
    res.render('pages/register');
});

register.post("/", upload.single("myFile"), async (req, res) => {
  const { filename } = req.file;
  const image = filename;

  const cart = await cartDao.save();
  const carritoId = cart?.id;

  const { username, password, email, edad, direccion, telefono } = req.body;
  usersDao.saveUser({ 
        username, 
        password, 
        email, 
        edad, 
        direccion, 
        image,
        telefono,
        carrito: carritoId
    }) 
    .then (async (user) => {
      if (user) {
        const mailOptions = {
          from: 'federico.imposti@gmail.com',
          to: 'federico.imposti@gmail.com',
          subject: 'Nuevo registro',
          html: `
            <p>Usuario: ${username}</p>
            <p>email: ${email}</p>
            <p>edad: ${edad}</p>
            <p>direccion: ${direccion}</p>
            <p>telefono: ${telefono}</p>
          `
       }
       
        await transporter.sendMail(mailOptions);
        return res.render('pages/succes')
      } else {
        res.render('pages/error', { error: 'Usuario ya registrado', url: 'register' }) 
      }      
    })
});

export default register;