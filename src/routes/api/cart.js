import express from 'express';
import { cartDao } from '../../daos/index.js';

const cartRouter = express.Router();

const error = { error: 'carrito no encontrado' };

cartRouter.get("/", (req, res) => {
  cartDao.getAll()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
        console.log('ocurrió un error al obtener los carrito.', err);
    })
  });

  cartRouter.get("/:id/productos", (req, res) => {
    const cartId = parseInt(req?.params?.id);

    cartDao.getProductsInCart(cartId)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log('ocurrió un error al obtener el carrito.', err);
      })
  });

  cartRouter.delete("/:id", (req, res) => {
    const cartId = parseInt(req?.params?.id);

    cartDao.deleteById(cartId)
      .then(response => {
        res.status(202).send(response);
      })
      .catch(err => {
        console.log('ocurrió un error al eliminar el carrito.', err);
      })
  });

  cartRouter.delete("/:id/productos/:id_prod", (req, res) => {
    const cartId = parseInt(req?.params?.id);
    const productId = parseInt(req?.params?.id_prod);

    cartDao.deleteByIdCartAndIdProduct(cartId, productId)
      .then(response => {
        res.status(202).send(response);
      })
      .catch(err => {
        console.log('ocurrió un error al eliminar el producto del carrito.', err);
      })
  });

  cartRouter.post("/", (req, res) => {
    cartDao.save(req.body)
      .then(response => {
        res.status(201).send(response);
      })
      .catch(err => {
          console.log('ocurrió un error al guardar el carrito.', err);
      })
  });

  cartRouter.post("/:id/productos", (req, res) => {
 
    const cartId = parseInt(req?.params?.id);

    cartDao.saveProductInCart(req.body, cartId)
      .then(response => {
        res.status(201).send(response);
      })
      .catch(err => {
          console.log('ocurrió un error al guardar el carrito.', err);
      })
  });

  cartRouter.put("/:id", (req, res) => {
    const cartId = parseInt(req?.params?.id);
    
    cartDao.update(cartId, req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log('ocurrió un error al modificar el carrito.', err);
      })
  });

export default cartRouter;