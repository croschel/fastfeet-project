import Mail from '../../lib/Mail';

class CreateOrderMail {
  get key() {
    return 'CreateOrderMail';
  }

  async handle({ data }) {
    const {
      transporter, recipient, order,
    } = data;

    await Mail.sendMail({
      to: `${transporter.name} <${transporter.email}>`,
      subject: 'Nova Entrega marcada',
      template: 'createorder',
      context: {
        transporter: transporter.name,
        recipient: recipient.name,
        product: order.product,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        state: recipient.state,
        city: recipient.city,
        cep: recipient.cep,
        availableCounter: transporter.orders_day,
      },
    });
  }
}

export default new CreateOrderMail();
