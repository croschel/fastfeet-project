import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import Inputmask from 'inputmask';
import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  HeadButtons,
  Content,
  FormRegister,
  InputForm,
} from './styles';

export default function Register() {
  useEffect(() => {
    // jquery functions
    const cep = document.getElementById('cep');
    const im = new Inputmask('99999-999');
    im.mask(cep);
    // jquery functions
  }, []);

  async function handleSubmit({
    name,
    street,
    number,
    complement,
    city,
    state,
    cep,
  }) {
    try {
      await api.post('recipients', {
        name,
        street,
        number,
        complement,
        city,
        state,
        cep,
      });
      toast.success('Destinatário cadastrado com sucesso');
      history.push('/recipients');
    } catch (err) {
      toast.error('Dados Incorretos, favor digitar novamente!');
    }
  }

  function handleBackButton() {
    history.push('/recipients');
  }
  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <HeadButtons>
            <h1>Cadastro de Destinatário</h1>
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
            <InputForm>
              <div className="first-line-input">
                <label htmlFor="name">Nome</label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Ludwig van Beethoven"
                />
              </div>
              <div className="second-line-input">
                <div>
                  <label htmlFor="street">Rua</label>
                  <Input name="street" type="text" placeholder="Rua Carvalho" />
                </div>
                <div>
                  <label htmlFor="number">Número</label>
                  <Input name="number" type="number" placeholder="1785" />
                </div>
                <div>
                  <label htmlFor="complement">Complemento</label>
                  <Input
                    name="complement"
                    type="text"
                    placeholder="casa/apto"
                  />
                </div>
              </div>
              <div className="third-line-input">
                <div>
                  <label htmlFor="city">Cidade</label>
                  <Input name="city" type="text" placeholder="Campinas" />
                </div>
                <div>
                  <label htmlFor="state">Estado</label>
                  <Input name="state" type="text" placeholder="São Paulo" />
                </div>
                <div>
                  <label htmlFor="cep">CEP</label>
                  <Input
                    id="cep"
                    name="cep"
                    type="text"
                    placeholder="04830-300"
                  />
                </div>
              </div>
            </InputForm>
          </FormRegister>
        </Form>
      </Content>
    </Container>
  );
}
