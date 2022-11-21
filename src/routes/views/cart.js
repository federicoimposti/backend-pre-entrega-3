import express from 'express';
import auth from '../../middlewares/auth.js';
import { User } from '../../controllers/models/User.js';
import { cartDao } from '../../daos/index.js';
import transporter from '../../middlewares/nodemailer.js';
import ejs from 'ejs';
import clientTwilio from '../../middlewares/twilio.js';

const cartRouter = express.Router();

cartRouter.get("/", auth, async (req, res) => {
  try {
    const { username, image, carrito, email } = await User.findById(req.user._id);
    const cart = await cartDao.getProductsInCart(carrito);

    res.render('pages/cart', {
        user: username,
        email,
        image,
        cartId: carrito,
        cart
      });
  } catch (e) {
    console.log('Error al renderizar la vista', e);
  }
    
});

cartRouter.post("/", async (req, res) => {
  try {
    const cart = await cartDao.getProductsInCart(req.body.carrito);
    const { user, email } = req.body;

    const mailOptions = {
      from: 'federico.imposti@gmail.com',
      to: 'federico.imposti@gmail.com',
      subject: `Nuevo pedido de ${user} - ${email}`,
      html: await ejs.renderFile(
        'src/views/email/cart_template.ejs', { cart })
    }
 
    await transporter.sendMail(mailOptions);
    await clientTwilio.messages.create({
      body: 'Su pedido ha sido recibido y se encuentra en progreso.',
      from: '+19108125307',
      to: '+541144932679'
    });

    await clientTwilio.messages.create({
      from: 'whatsapp:+14155238886',
      body: `Nuevo pedido de ${user} - ${email}`,
      to: 'whatsapp:+5491144932679'
    });

    res.status(201).send('ok');
  } catch (e) {
    console.log('Error al realizar el pedido.', e);
  }
});
  
export default cartRouter;