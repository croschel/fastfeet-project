import * as Yup from 'yup';
import OrderProblem from '../models/OrderProblem';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Transporter from '../models/Transporter';
import Queue from '../../lib/Queue';
import CancellationOrderMail from '../jobs/CancellationOrderMail';

class OrderProblemsController {
  async store(req, res) {
    const { order_id } = req.params;
    const { description } = req.body;

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(400).json({ error: 'This order does not exists' });
    }

    const schema = Yup.object().shape({
      description: Yup.string()
        .required()
        .min(10),
    });
    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation error' });
    }

    if (order.end_date !== null) {
      return res.status(500).json({ error: "You can't add a problem for order was delivered" });
    }
    const problem = await OrderProblem.create({
      description,
      order_id,
    });

    return res.json(problem);
  }

  async index(req, res) {
    const problemsOrders = await OrderProblem.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Order,
          attributes: ['id', 'product', 'start_date', 'canceled_at'],
          include: [
            {
              model: Recipient,
              attributes: ['id', 'name', 'street'],
            },
            {
              model: Transporter,
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (!problemsOrders) {
      return res.status(404).json({ error: 'Problems were not found' });
    }

    return res.json(problemsOrders);
  }

  async show(req, res) {
    const { order_id } = req.params;
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(400).json({ error: 'This order does not exists' });
    }
    const problemsOfOrder = await OrderProblem.findAll({
      where: {
        order_id,
      },
      attributes: ['id', 'description', 'createdAt'],
    });

    if (!problemsOfOrder) {
      return res
        .status(400)
        .json({ error: 'There is no one problem about this order' });
    }
    return res.json(problemsOfOrder);
  }

  async update(req, res) {
    const { id } = req.params;
    const problem = await OrderProblem.findByPk(id);
    if (!problem) {
      return res.status(400).json({ error: 'This problem does not exists' });
    }
    const order = await Order.findByPk(problem.order_id);

    const deletedOrder = await order.update({
      canceled_at: new Date(),
    });
    if (!deletedOrder) {
      return res.status(400).json({ error: 'The order was not found' });
    }

    if (order.canceled_at !== null) {
      return res.status(400).json({ error: 'This Order have Already been canceled' });
    }
    const transporter = await Transporter.findByPk(order.transporter_id);
    const recipient = await Recipient.findByPk(order.recipient_id);


    await transporter.update({
      orders_day: transporter.orders_day - 1,
    });

    await Queue.add(CancellationOrderMail.key, {
      recipient,
      transporter,
      order,
      problem,
    });

    return res.json(deletedOrder);
  }
}

export default new OrderProblemsController();
