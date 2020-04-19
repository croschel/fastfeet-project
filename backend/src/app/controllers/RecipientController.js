/* eslint-disable class-methods-use-this */
import * as yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      street: yup.string().required(),
      number: yup.number().required(),
      complement: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      cep: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }
  async update(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient was not found' });
    }
    const schema = yup.object().shape({
      name: yup.string(),
      street: yup.string(),
      number: yup.number(),
      complement: yup.string(),
      state: yup.string(),
      city: yup.string(),
      cep: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }
    const newRecipient = await recipient.update(req.body);
    return res.json(newRecipient);
  }
  async index(req, res) {
    try {
      const { page = 1, q = null } = req.query;
      if (q !== null) {
        const recipients = await Recipient.findAll({
          where: {
            name: {
              [Op.iLike]: `%${q}%`
            }
          },
          limit: 20,
          offset: (page - 1) * 20,
        })
        return res.json(recipients);
      }
      const recipients = await Recipient.findAll({
        limit: 20,
        offset: (page - 1) * 20,
      })
      return res.json(recipients);

    } catch (error) {
      res.status(500).json('Internal Server Error');
    }
  }
  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    return res.json(recipient);
  }
  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    await recipient.destroy();

    return res.json("Destinatario removido");

  }
}

export default new RecipientController();
