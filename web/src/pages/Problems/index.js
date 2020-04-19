import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { IoMdEye } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { Container, OrdersTable, OrderView } from './styles';
import MoreOptions from '~/components/MoreOptions';
import api from '~/services/api';
import history from '~/services/history';

export default function Problems() {
  const [visible, setVisible] = useState(false);
  const [problems, setProblems] = useState([]);
  const [recipientInfo, setRecipientInfo] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problems');
      const problemslist = response.data;

      // just problems were not canceled
      const newArray = problemslist.filter(
        (problem) => problem.Order.canceled_at === null
      );
      setProblems(newArray);
    }
    loadProblems();
  }, []);

  function handleView(problem) {
    setRecipientInfo(problem.description);
    setVisible(!visible);

    $('body').click(function () {
      setVisible(false);
    });
  }

  async function handleDelete(problem) {
    const conf = window.confirm('Tem certeza que deseja cancelar o Pedido?');
    if (conf) {
      await api.delete(`orders/${problem.Order.id}`);
      document.location.reload(true);
      history.push('/');
    }
  }
  return (
    <Container>
      <h1>Gerenciamento de Problemas</h1>

      <OrdersTable>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr>
              <td>#0{problem.Order.id}</td>
              <td>{problem.description}</td>
              <td>
                <MoreOptions>
                  <button type="button" onClick={() => handleView(problem)}>
                    <IoMdEye size={15} color="#5881d0" />
                    Visualizar
                  </button>

                  <button type="button" onClick={() => handleDelete(problem)}>
                    <MdDelete size={15} color="#d04a4a" />
                    Cancelar Encomenda
                  </button>
                </MoreOptions>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
      {visible ? (
        <OrderView className="box-info" visible={visible}>
          <label htmlFor="order-info">Visualizar Problema</label>
          <div className="info-box" name="order-info">
            <p>{recipientInfo}</p>
          </div>
        </OrderView>
      ) : (
          <></>
        )}
    </Container>
  );
}
