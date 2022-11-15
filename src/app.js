import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import compression from 'compression';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { apiRouter } from './routes/api/index.js';
import { viewsRouter } from './routes/views/index.js';

import { advanceOptions } from '../config/mongo/index.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cookieParser());

let mongoUrl = process.env.MONGO_URI;

app.use(
  session({
      store: new MongoStore({ 
          mongoUrl: mongoUrl,
          mongoOptions: advanceOptions   
      }),     
      secret: 'coderhouse',
      resave: true,
      saveUninitialized: true,
      rolling: true,
      cookie: { maxAge: 600000 },
  })
);

app.use(compression());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter);
app.use('/api', apiRouter);

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));

app.use((req, res, next) => {
   if(res.status(404)) {
      const error = {
         error: -2,
         method: req.method,
         path: req.path
      }

      res.status(404).send(error);
   }
});