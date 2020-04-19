/* eslint-disable class-methods-use-this */
import Order from '../models/Order';
import Transporter from '../models/Transporter';
import Recipient from '../models/Recipient';
import Signature from '../models/Signature';
//import { getDate, isSunday } from 'date-fns';

class OrderedTransporterController {
  async index(req, res) {
    const { id } = req.params;
    // const date = new Date();
    // const teste = getDate(date);
    //console.log(teste, isSunday(teste));

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
      },
      include: [
        {
          model: Recipient
        }
      ]
    });
    if (!orders) {
      return res.json({ message: 'There is no one orders for you' });
    }

    const validatedOrders = orders.filter(order => {
      if (order.end_date !== null) {
        return order;
      }
    });

    return res.json(validatedOrders);
  }

  async update(req, res) {
    const { transporter_id } = req.params;
    const { signature_id } = req.body;
    const transporter = await Transporter.findByPk(transporter_id);

    if (!transporter) {
      return res
        .status(400)
        .json({ error: 'This transporter does not exists' });
    }

    const signature = await Signature.findByPk(signature_id);

    if (!signature) {
      return res.status(400).json({ error: 'This Signature does not exists' });
    }

    const { order_id } = req.params;
    const order = await Order.findOne({
      where: {
        id: order_id,
        end_date: null,
        canceled_at: null,
      },
    });
    if (!order) {
      return res.json({ message: 'This is a Invalid Order' });
    }
    if (order.start_date === null) {
      return res
        .status(401)
        .json({ error: 'This order has not been withdrawn' });
    }
    const date = new Date();

    const finishedOrder = await order.update({
      end_date: date,
      signature_id,
    });

    return res.json(finishedOrder);
  }
}

export default new OrderedTransporterController();
