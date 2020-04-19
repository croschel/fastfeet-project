import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Transporter from '../models/Transporter';
import File from '../models/File';
import Signature from '../models/Signature';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CreateOrderMail from '../jobs/CreateOrderMail';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      transporter_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }
    const recipient = await Recipient.findByPk(req.body.recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const transporter = await Transporter.findOne({
      where: { id: req.body.transporter_id },
    });

    if (!transporter) {
      return res.status(400).json({ error: 'Transporter does not exists' });
    }

    const order = await Order.create(req.body);

    await Notification.create({
      content: `Nova entrega para ${recipient.name}`,
      user: req.body.transporter_id,
    });

    await Queue.add(CreateOrderMail.key, {
      recipient,
      transporter,
      order,
    });

    return res.json(order);
  }

  async index(req, res) {
    try {
      const { page = 1, q = null } = req.query;
      if (q !== null) {
        const orders = await Order.findAll({
          where: {
            product: {
              [Op.iLike]: `%${q}%`
            },
          },
          limit: 20,
          offset: (page - 1) * 20,
          attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
          include: [
            {
              model: Signature,
            },
            {
              model: Recipient,
              attributes: ['id', 'name', 'street', 'city', 'state', 'cep'],
            },
            {
              model: Transporter,
              attributes: ['id', 'name', 'avatar_id'],
              include: [
                {
                  model: File,
                }
              ]
            },
          ],
        });
        return res.json(orders);
      }
      const orders = await Order.findAll({
        limit: 20,
        offset: (page - 1) * 20,
        order: ['id'],
        attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
        include: [
          {
            model: Signature,
          },
          {
            model: Recipient,
            attributes: ['id', 'name', 'street', 'number', 'city', 'state', 'cep'],
          },
          {
            model: Transporter,
            attributes: ['id', 'name', 'avatar_id'],
            include: [
              {
                model: File,
              }
            ]
          },
        ],
      });
      return res.json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  async show(req, res) {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    return res.json(order);
  }

  async update(req, res) {
    const order = await Order.findOne({
      where: { id: req.params.id },
    });

    if (!order) {
      return res.status(400).json({ error: 'This Order does not exists' });
    }

    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      transporter_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    // just if user wants to update this attributes
    if (req.body.recipient_id && req.body.transporter_id) {
      const recipient = await Recipient.findOne({
        where: { id: req.body.recipient_id },
      });
      const transporter = await Transporter.findOne({
        where: { id: req.body.transporter_id },
      });

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient does not exists' });
      }
      if (!transporter) {
        return res.status(400).json({ error: 'Transporter does not exists' });
      }
    }

    const {
      id, product, recipient_id, transporter_id,
    } = await order.update(
      req.body,
    );
    return res.json({
      id,
      product,
      recipient_id,
      transporter_id,
    });
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'This Order does not exists' });
    }

    const { id, product, canceled_at } = await order.update({
      canceled_at: new Date(),
    });

    return res.json({ id, product, canceled_at });
  }
}

export default new OrderController();
