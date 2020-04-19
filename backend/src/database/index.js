import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Transporter from '../app/models/Transporter';
import File from '../app/models/File';
import Order from '../app/models/Order';
import Signature from '../app/models/Signature';
import OrderProblem from '../app/models/OrderProblem';

import configDatabase from '../config/database';

const models = [
  User,
  Recipient,
  Transporter,
  File,
  Order,
  Signature,
  OrderProblem,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      },
    );
  }
}

export default new Database();
