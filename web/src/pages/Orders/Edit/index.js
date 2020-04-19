import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  HeadButtons,
  Content,
  Selects,
  InputProduct,
  FormRegister,
} from './styles';

export default function Edit() {
  const [transporters, setTransporters] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [recipientForm, setRecipientform] = useState('');
  const [transporterForm, setTransporterform] = useState('');
  const [order, setOrder] = useState(useParams());
  const [orderData, setOrderData] = useState({});
  const [transpName, setTranspName] = useState('');
  const [recipName, setRecipName] = useState('');

  useEffect(() => {
    async function loadTransporters() {
      const response = await api.get('transporters');
      const transporterslist = response.data;
      setTransporters(transporterslist);
    }
    async function loadRecipients() {
      const response = await api.get('recipients');
      const recipientslist = response.data;
      setRecipients(recipientslist);
    }
    loadRecipients();
    loadTransporters();
  }, []);

  useEffect(() => {
    async function getOrderById() {
      const orderInfo = await api.get(`orders/${order.id}`);
      const transpInfo = await api.get(
        `transporters/${orderInfo.data.transporter_id}`
      );
      const recipInfo = await api.get(
        `recipients/${orderInfo.data.recipient_id}`
      );
      setOrderData(orderInfo.data);
      setTranspName(transpInfo.data.name);
      setRecipName(recipInfo.data.name);
    }
    getOrderById();
  }, [order.id]);

  async function handleSubmit({ product }) {
    console.tron.log(product, recipientForm, transporterForm);

    try {
      await api.put(`orders/${order.id}`, {
        product,
        recipient_id: recipientForm,
        transporter_id: transporterForm,
      });
      toast.success(`Pedido Atualizado com sucesso!`);
      history.push('/');
    } catch (err) {
      toast.error('Dados incorretos, realize a operação novamente');
    }
  }
  function handleBackButton() {
    history.push('/');
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <HeadButtons>
            <h1>Edição de encomendas</h1>
            <div>
              <button id="back-button" type="button" onClick={handleBackButton}>
                <MdKeyboardArrowLeft size={25} color="#FFF" />
                VOLTAR
              </button>
              <button id="done-button" type="submit">
                <MdDone size={20} color="#FFF" />
                SALVAR
              </button>
            </div>
          </HeadButtons>
          <FormRegister>
            <Selects>
              <div>
                <label htmlFor="recipient">Destinatário</label>
                <select
                  name="recipient"
                  contentEditable
                  onChange={(e) => setRecipientform(e.target.value)}
                >
                  <option value={orderData.recipient_id} selected>
                    {transpName}
                  </option>
                  {recipients.map((rc) => (
                    <option value={rc.id}>{rc.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="transporter">Entregador</label>
                <select
                  name="transporter"
                  defaultValue="Selecione"
                  onChange={(e) => setTransporterform(e.target.value)}
                >
                  <option value={orderData.transporter_id} selected>
                    {recipName}
                  </option>
                  {transporters.map((tr) => (
                    <option value={tr.id}>{tr.name}</option>
                  ))}
                </select>
              </div>
            </Selects>
            <InputProduct>
              <label htmlFor="product">Nome do Produto</label>
              <Input
                name="product"
                type="text"
                placeholder={orderData.product}
                defaultValue={orderData.product}
              />
            </InputProduct>
          </FormRegister>
        </Form>
      </Content>
    </Container>
  );
}
