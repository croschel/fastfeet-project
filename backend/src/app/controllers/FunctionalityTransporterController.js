/* eslint-disable class-methods-use-this */
import { getHours, getDate } from 'date-fns';
import Order from '../models/Order';
import Transporter from '../models/Transporter';
import Recipient from '../models/Recipient';

class FunctionalityTransporterController {
  async index(req, res) {
    const { id } = req.params;

    const transporter = await Transporter.findByPk(id);

    if (!transporter) {
      return res
        .status(400)
        .json({ error: 'This transporter does not exists' });
    }

    const orders = await Order.findAll({
      where: {
        transporter_id: transporter.id,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: Recipient
        },
        {
          model: Transporter
        }
      ]
    });

    if (!orders) {
      return res.json({ message: 'There is no one orders for you' });
    }

    return res.json(orders);
  }

  async update(req, res) {
    const { transporter_id } = req.params;

    const transporter = await Transporter.findByPk(transporter_id);

    if (!transporter) {
      return res
        .status(400)
        .json({ error: 'This transporter does not exists' });
    }

    const { order_id } = req.params;
    const order = await Order.findOne({
      where: {
        id: order_id,
        canceled_at: null,
        start_date: null,
      },
    });
    if (!order) {
      return res.json({ message: 'This is a Invalid Order' });
    }
    const date = new Date();
    const dateHour = getHours(date);
    // Check if dateHours(date=>start_date) is between 08 and 18h
    if (!(dateHour >= 8 && dateHour <= 18)) {
      return res
        .status(401)
        .json({ error: 'You only can withdraw an order between 08 and 18.' });
    }

    // Check if transporter have more than 5 orders per day
    if (transporter.orders_day === 5) {
      const orders = await Order.findAll({
        where: {
          transporter_id,
          canceled_at: null,
        },
      });
      const allOrdersOpenned = orders.filter((order) => {
        if (order.start_date !== null) {
          return order;
        }
      });
      const lastIndexOrder = allOrdersOpenned.length - 1;
      const dateLastOrder = getDate(
        allOrdersOpenned[lastIndexOrder].start_date,
      );
      if (dateLastOrder === getDate(new Date())) {
        return res.status(401).json({
          error:
            'You have already passed through the limit from 5 order per day',
        });
      }
      await transporter.update({
        orders_day: 0,
      });
      const updatedOrder = await order.update({
        start_date: date,
      });
      return res.json(updatedOrder);
    }
    const updatedOrder = await order.update({
      start_date: date,
    });
    await transporter.update({
      orders_day: transporter.orders_day + 1,
    });

    return res.json(updatedOrder);
  }
}

export default new FunctionalityTransporterController();
