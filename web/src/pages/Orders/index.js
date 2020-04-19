import React, { useState, useEffect } from 'react';
import { IoMdAdd, IoMdEye } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import $ from 'jquery';
import { Container, OrdersTable, Header, OrderView } from './styles';
import MoreOptions from '~/components/MoreOptions';
import { dateCalendar } from '~/util/formatDate';
import api from '~/services/api';
import history from '~/services/history';
import logo from '../../assets/logo.png';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [searchedOrder, setSearchedOrder] = useState([]);
  const [search, setSearch] = useState('');

  // handle with status attribute
  function handleStatus(order) {
    if (order.canceled_at !== null) {
      return (
        <p value="CANCELADA" style={{ background: '#f92424', opacity: 0.6 }}>
          CANCELADA
        </p>
      );
    }
    if (order.start_date === null) {
      return (
        <p value="PENDENTE" style={{ background: '#ffc71f', opacity: 0.6 }}>
          PENDENTE
        </p>
      );
    }
    if (order.start_date !== null && order.end_date === null) {
      return (
        <p value="RETIRADA" style={{ background: '#1fc7ff', opacity: 0.6 }}>
          RETIRADA
        </p>
      );
    }
    if (order.end_date !== null) {
      return (
        <p value="ENTREGUE" style={{ background: '#24f9b2', opacity: 0.6 }}>
          ENTREGUE
        </p>
      );
    }
    return '';
  }

  // load orders on load components
  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');
      const orderlist = response.data;
      const orderlistStatus = orderlist.map((order) => {
        if (order.Recipient.name === null) {
          order.Recipient.name = 'CANCELADO';
        }
        return {
          ...order,
          status: handleStatus(order),
        };
      });

      const orderFileValidated = orderlistStatus.map((tl) => {
        if (tl.Transporter.avatar_id === null) {
          return {
            ...tl,
            Transporter: {
              ...tl.Transporter,
              File: {
                url: null,
              },
            },
          };
        }
        return tl;
      });
      console.tron.log(orderFileValidated);
      setOrders(orderFileValidated);
      setSearchedOrder(orderFileValidated);
    }
    loadOrders();
  }, []);

  // Open Register for orders
  function handleRegister() {
    history.push('/order_register');
  }

  // Search function
  useEffect(() => {
    const result = orders.filter((order) =>
      order.product.toLowerCase().includes(search)
    );
    setSearchedOrder(result);
  }, [search]);

  // functions for more options when you click in actions
  function handleView(order) {
    setOrderInfo(order);
    setVisible(!visible);

    $('body').click(function () {
      setVisible(false);
    });
  }

  // function to take client to another page to edit
  function handleEdit(order) {
    history.push(`/order/${order.id}`);
  }

  // function to cancel an order
  async function handleDelete(order) {
    const conf = window.confirm('Tem certeza que deseja cancelar o Pedido?');
    if (conf) {
      // if (order.status.value !== 'CANCELADA' || order.status.value !== 'ENTREGUE')
      await api.delete(`orders/${order.id}`);
      document.location.reload(true);
    }
  }

  return (
    <Container>
      <h1>Gerenciamento de Encomendas</h1>
      <Header>
        <input
          type="search"
          placeholder="Buscar por encomendas"
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
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {searchedOrder.map((order) => (
            <tr>
              <td>#0{order.id}</td>
              <td>{order.Recipient.name}</td>
              <td>
                <div>
                  <img
                    src={
                      order.Transporter.File.url ||
                      'https://api.adorable.io/avatars/40/abott@adorable.png'
                    }
                    alt="avatar"
                  />
                  {order.Transporter.name}
                </div>
              </td>
              <td>{order.Recipient.city}</td>
              <td>{order.Recipient.state}</td>
              <td>
                <p id="status" status={order.status}>
                  {order.status}
                </p>
              </td>
              <td>
                <MoreOptions>
                  <button type="button" onClick={() => handleView(order)}>
                    <IoMdEye size={15} color="#7049ad" />
                    Visualizar
                  </button>

                  <button type="button" onClick={() => handleEdit(order)}>
                    <MdEdit size={15} color="#5881d0" />
                    Editar
                  </button>

                  <button type="button" onClick={() => handleDelete(order)}>
                    <MdDelete size={15} color="#d04a4a" />
                    Excluir
                  </button>
                </MoreOptions>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
      {visible ? (
        <OrderView className="box-info" visible={visible}>
          <label htmlFor="order-info">Informações da encomenda</label>
          <div className="info-box" name="order-info">
            <p>{`${orderInfo.Recipient.street},${orderInfo.Recipient.number}`}</p>
            <p>{`${orderInfo.Recipient.city} - ${orderInfo.Recipient.state}`}</p>
            <p>{orderInfo.Recipient.cep}</p>
          </div>
          <label htmlFor="date-info" className="date-label">
            Datas
          </label>
          <div className="info-box" name="date-info">
            <p>
              <strong>Retirada: </strong>
              {dateCalendar(orderInfo.start_date)}
            </p>
            <p>
              <strong>Entrega: </strong>
              {dateCalendar(orderInfo.end_date)}
            </p>
          </div>
          <div className="info-box">
            <label htmlFor="signature">Assinatura do destinatário</label>
            <img
              src={orderInfo.Signature ? orderInfo.Signature.url : logo}
              alt="Signature"
            />
          </div>
        </OrderView>
      ) : (
          <></>
        )}
    </Container>
  );
}
