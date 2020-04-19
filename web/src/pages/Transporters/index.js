import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Container, OrdersTable, Header } from './styles';
import MoreOptions from '~/components/MoreOptions';
import api from '~/services/api';
import history from '~/services/history';

export default function Transporters() {
  const [transporters, setTransporters] = useState([]);
  const [searchedTransporter, setSearchedTransporter] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadTransporters() {
      const response = await api.get('transporters');
      const transporterslist = response.data;
      const transporterFileValidated = transporterslist.map((tl) => {
        if (tl.avatar_id === null) {
          return {
            ...tl,
            File: {
              url: null,
            },
          };
        }
        return tl;
      });
      setTransporters(transporterFileValidated);
      setSearchedTransporter(transporterFileValidated);
    }
    loadTransporters();
  }, []);

  // Search function
  useEffect(() => {
    const result = transporters.filter((transporter) =>
      transporter.name.toLowerCase().includes(search)
    );
    setSearchedTransporter(result);
  }, [search]);

  function handleRegister() {
    history.push('/transporter_register');
  }

  function handleEdit(transporter) {
    history.push(`transporter/${transporter.id}`);
  }

  async function handleDelete(transporter) {
    const conf = window.confirm(
      `Tem certeza que deseja excluir ${transporter.name}?`
    );
    if (conf) {
      // if (order.status.value !== 'CANCELADA' || order.status.value !== 'ENTREGUE')
      await api.delete(`transporters/${transporter.id}`);
      document.location.reload(true);
    }
  }

  return (
    <Container>
      <h1>Gerenciamento de Entregadores</h1>
      <Header>
        <input
          type="text"
          placeholder="Buscar por Entregadores"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" onClick={handleRegister}>
          <IoMdAdd id="addButton" size={15} color="#fff" />
          Cadastrar
        </button>
      </Header>
      <OrdersTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {searchedTransporter.map((transporter) => (
            <tr>
              <td>#0{transporter.id}</td>
              <td>
                <img
                  src={
                    transporter.File.url ||
                    `https://api.adorable.io/avatars/40/${transporter.name}.png`
                  }
                  alt="Profile Avatar"
                />
              </td>
              <td>{transporter.name}</td>
              <td>{transporter.email}</td>
              <td>
                <MoreOptions>
                  <button type="button" onClick={() => handleEdit(transporter)}>
                    <MdEdit size={15} color="#5881d0" />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(transporter)}
                  >
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
