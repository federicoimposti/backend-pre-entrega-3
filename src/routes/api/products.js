import express from 'express';
import { productsDao } from '../../daos/index.js';

const productsRouter = express.Router();

const error = { error: 'Producto no encontrado' };

productsRouter.get("/", (req, res) => {
  productsDao.getAll()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
        console.log('ocurrió un error al obtener los productos.', err);
    })
  });

  productsRouter.get("/:id", (req, res) => {
    const productId = parseInt(req?.params?.id);

    productsDao.getById(productId)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log('ocurrió un error al obtener el producto.', err);
      })
  });

  productsRouter.delete("/:id", (req, res) => {
    if (!res.admin) {
      const authError = { 
        error: -1,
        method: req.method,
        path: req.originalUrl
       }

      res.status(403).send(authError)
    } else {
      const productId = parseInt(req?.params?.id);

      productsDao.deleteById(productId)
        .then(response => {
          res.status(202).send(response);
        })
        .catch(err => {
          console.log('ocurrió un error al eliminar el producto.', err);
        });
    }
  });

  productsRouter.post("/", (req, res) => {
    if (!res.admin) {
      const authError = { 
        error: -1,
        method: req.method,
        path: req.originalUrl
       }

      res.status(403).send(authError)
    } else {
      productsDao.save(req.body)
        .then(response => {
          res.status(201).send(response);
        })
        .catch(err => {
            console.log('ocurrió un error al guardar el producto.', err);
        })
    }
  });

  productsRouter.put("/:id", (req, res) => {
    if (!res.admin) {
      const authError = { 
        error: -1,
        method: req.method,
        path: req.originalUrl
       }

      res.status(403).send(authError)
    } else {
      const productId = parseInt(req?.params?.id);
    
      productsDao.update(productId, req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(err => {
          console.log('ocurrió un error al modificar el producto.', err);
        })
    }
  });

export default productsRouter;