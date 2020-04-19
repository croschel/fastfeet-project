import React, { useState, useEffect } from 'react';
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

export default function Register() {
  const [transporters, setTransporters] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [recipientForm, setRecipientform] = useState('');
  const [transporterForm, setTransporterform] = useState('');

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

  async function handleSubmit({ product }) {
    console.tron.log(product, recipientForm, transporterForm);

    try {
      const response = await api.post('orders', {
        product,
        recipient_id: recipientForm,
        transporter_id: transporterForm,
      });
      toast.success(`Produto ${response.data.product} Cadastrado com sucesso!`);
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
            <h1>Cadastro de encomendas</h1>
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
                  <option value="" selected="selected disabled hidden">
                    Selecione
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
                  <option value="" selected="selected disabled hidden">
                    Selecione
                  </option>
                  {transporters.map((tr) => (
                    <option value={tr.id}>{tr.name}</option>
                  ))}
                </select>
              </div>
            </Selects>
            <InputProduct>
              <label htmlFor="product">Nome do Produto</label>
              <Input name="product" type="text" placeholder="Nome do Produto" />
            </InputProduct>
          </FormRegister>
        </Form>
      </Content>
    </Container>
  );
}
