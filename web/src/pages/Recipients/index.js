import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Container, OrdersTable, Header } from './styles';
import MoreOptions from '~/components/MoreOptions';
import api from '~/services/api';
import history from '~/services/history';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [searchedRecipient, setSearchedRecipient] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients');
      const recipientslist = response.data;
      setRecipients(recipientslist);
      setSearchedRecipient(recipientslist);
    }
    loadRecipient();
  }, []);

  // Search function
  useEffect(() => {
    const result = recipients.filter((recipient) =>
      recipient.name.toLowerCase().includes(search)
    );
    setSearchedRecipient(result);
  }, [search]);

  function handleRegister() {
    history.push('/recipient_register');
  }
  function handleEdit(recipient) {
    history.push(`/recipient/${recipient.id}`);
  }

  async function handleDelete(recipient) {
    const conf = window.confirm(
      `Tem certeza que deseja excluir ${recipient.name}?`
    );
    if (conf) {
      // if (order.status.value !== 'CANCELADA' || order.status.value !== 'ENTREGUE')
      await api.delete(`recipients/${recipient.id}`);
      document.location.reload(true);
    }
  }
  return (
    <Container>
      <h1>Gerenciamento de Destinatários</h1>
      <Header>
        <input
          type="text"
          placeholder="Buscar por Destinatários"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleRegister} type="button">
          <IoMdAdd id="addButton" size={15} color="#fff" />
          Cadastrar
        </button>
      </Header>
      <OrdersTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {searchedRecipient.map((recipient) => (
            <tr>
              <td>#0{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>{`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}</td>
              <td>
                <MoreOptions>
                  <button type="button" onClick={() => handleEdit(recipient)}>
                    <MdEdit size={15} color="#5881d0" />
                    Editar
                  </button>

                  <button type="button" onClick={() => handleDelete(recipient)}>
                    <MdDelete size={15} color="#d04a4a" />
                    Excluir
                  </button>
                </MoreOptions>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
    </Container>
  );
}
