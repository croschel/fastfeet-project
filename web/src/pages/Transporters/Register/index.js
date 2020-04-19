import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  HeadButtons,
  Content,
  FormRegister,
  InputForm,
  AvatarInput,
} from './styles';

export default function Register() {
  const [preview, setPreview] = useState(
    'https://api.adorable.io/avatars/100/abott@adorable.png'
  );
  const [file, setFile] = useState();

  async function handleSubmit({ name, email }) {
    try {
      await api.post(`transporters`, {
        name,
        email,
        avatar_id: file,
      });
      toast.success(`Entregador ${name} cadastrado com sucesso!`);
      history.push('/transporters');
    } catch (err) {
      toast.error('Dados incorretos, digite novamente!');
    }
  }

  async function handleAvatar(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    console.tron.log(response);
    const { id, url } = response.data;

    setPreview(url);
    setFile(id);
  }

  function handleBackButton() {
    history.push('/transporters');
  }
  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <HeadButtons>
            <h1>Cadastro de Entregadores</h1>
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
            <AvatarInput name="avatar_id">
              <label htmlFor="avatar">
                <img src={preview} alt="Avatar" />
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  data-file={file}
                  onChange={handleAvatar}
                />
              </label>
            </AvatarInput>
            <InputForm>
              <div>
                <label htmlFor="name">Nome</label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Nome do Entregador"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="email@email.com.br"
                />
              </div>
            </InputForm>
          </FormRegister>
        </Form>
      </Content>
    </Container>
  );
}
