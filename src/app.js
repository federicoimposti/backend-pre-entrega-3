import * as dotenv from 'dotenv';
dotenv.config();

import logger from './logs/logger.js';
import express from 'express';
import session from 'express-session';
import minimist from 'minimist';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import compression from 'compression';
import cluster from 'cluster';
import os from 'os';

import path from 'path';
import { fileURLToPath } from 'url';

const optionsMinimist = {alias: { cl: 'cluster' }};
const argv = minimist(process.argv.slice(2), optionsMinimist);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { apiRouter } from './routes/api/index.js';
import { viewsRouter } from './routes/views/index.js';

import { advanceOptions } from '../config/mongo/index.js';

const PORT = process.env.PORT || 8080;
const numCPUs = os.cpus().length;

if (cluster.isPrimary && argv?.c) {
   console.log("num CPUs: " + numCPUs);
   console.log(`I am a master ${process.pid}`);
   for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
   }
   cluster.on("exit", (worker) => {
      console.log(`${worker.process.pid} is finished`);
   });
} else {
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

   server.on("error", error => {
      logger.error(`Error: ${err}`);
      console.log(`Error en servidor ${error}`)
   });
}