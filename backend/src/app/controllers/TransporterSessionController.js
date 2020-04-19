import Transporter from '../models/Transporter';
import File from '../models/File';

class TransporterSessionController {
  async store(req, res) {
    const { transporter_id } = req.body;

    const transporter = await Transporter.findOne({
      where: {
        id: transporter_id,
      },
      include: [
        {
          model: File,
        }
      ]
    });

    if (!transporter) {
      return res.status(401).json({ error: 'Transporter does not Exists' });
    }


    return res.json({
      transporter
    });
  }
}

export default new TransporterSessionController();

