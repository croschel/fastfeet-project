import * as yup from 'yup';
import { Op } from 'sequelize';
import Transporter from '../models/Transporter';
import File from '../models/File';

class TransporterController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Error' });
    }

    const deliverExists = await Transporter.findOne({
      where: { email: req.body.email },
    });

    if (deliverExists) {
      return res
        .status(400)
        .json({ error: 'This delivery man already exists!' });
    }

    const { id, name, email } = await Transporter.create(req.body);

    return res.json({ id, name, email });
  }

  async index(req, res) {
    try {
      const { page = 1, q = null } = req.query;
      if (q !== null) {
        const transporters = await Transporter.findAll({
          where: {
            name: {
              [Op.iLike]: `%${q}%`
            }
          },
          limit: 20,
          offset: (page - 1) * 20,
          order: ['id'],
        });
        return res.json(transporters);
      }
      const transporters = await Transporter.findAll({
        limit: 20,
        offset: (page - 1) * 20,
        order: ['id'],
        include: [
          {
            model: File,

          },
        ]
      });
      return res.json(transporters);
    } catch (err) {
      res.status(500).json("Internal server error")
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const transporter = await Transporter.findOne({
      where: {
        id
      },
      include: [
        {
          model: File

        }
      ]
    });
    return res.json(transporter);
  }

  async update(req, res) {
    const { id } = req.params;
    const transporter = await Transporter.findByPk(id);

    if (!transporter) {
      return res.status(401).json({ error: 'Transporter was not found' });
    }

    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Error' });
    }

    await transporter.update(req.body);

    const updatedTransporter = await Transporter.findOne({
      where: {
        id,
      },
      include: [
        {
          model: File,
        }
      ]
    })

    return res.json(updatedTransporter);
  }

  async delete(req, res) {
    const { id } = req.params;
    const transporter = await Transporter.findByPk(id);

    if (!transporter) {
      return res.status(401).json({ error: 'Transporter was not found' });
    }

    await transporter.destroy();

    return res.json({ message: 'Transporter deleted' });
  }
}

export default new TransporterController();
