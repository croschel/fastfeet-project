import 'dotenv/config';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import './database';
import path from 'path';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/signatures',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'signatures'))
    );
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'avatars'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
