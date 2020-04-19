import Mail from '../../lib/Mail';

class CancellationOrder {
  get key() {
    return 'CancellationOrder';
  }

  async handle({ data }) {
    const {
      transporter, recipient, order, problem,
    } = data;

    await Mail.sendMail({
      to: `${transporter.name} <${transporter.email}>`,
      subject: 'Cancelamento de Entrega',
      template: 'cancelorder',
      context: {
        transporter: transporter.name,
        recipient: recipient.name,
        product: order.product,
        description: problem.description,
        availableCounter: transporter.orders_day,
      },
    });
  }
}

export default new CancellationOrder();
