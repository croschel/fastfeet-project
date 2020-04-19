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
  FormRegister,
  InputForm,
  AvatarInput,
} from './styles';

export default function Edit() {
  const [param, setParam] = useState(useParams);
  const [file, setFile] = useState();
  const [transporterData, setTransporterData] = useState({});
  const [preview, setPreview] = useState();

  useEffect(() => {
    async function getTransporterDataById() {
      const response = await api.get(`transporters/${param.id}`);
      const transporter = response.data;
      console.tron.log(transporter);
      if (transporter.avatar_id === null) {
        setPreview('https://api.adorable.io/avatars/100/abott@adorable.png');
      } else {
        setPreview(transporter.File.url);
      }
      setTransporterData(transporter);
    }
    getTransporterDataById();
  }, [param.id]);

  async function handleSubmit({ name, email }) {
    try {
      await api.put(`transporters/${param.id}`, {
        name,
        email,
        avatar_id: file,
      });
      toast.success(`Entregador atualizado com sucesso!`);
      history.push('/transporters');
    } catch (err) {
      toast.error('Dados incorretos, digite novamente!');
    }
  }

  async function handleAvatar(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

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
        <Form initialData={transporterData} onSubmit={handleSubmit}>
          <HeadButtons>
            <h1>Edição de Entregador</h1>
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
                <Input name="name" type="text" placeholder="Nome do Produto" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input name="email" type="email" placeholder="Email" />
              </div>
            </InputForm>
          </FormRegister>
        </Form>
      </Content>
    </Container>
  );
}
