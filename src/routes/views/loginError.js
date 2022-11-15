import express from 'express';
const loginError = express.Router();

loginError.get("/", (req, res) => {  
  res.render('pages/error', {error: 'Datos incorrectos', url: 'login'}) 
});


export default loginError;