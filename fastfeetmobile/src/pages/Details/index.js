import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, Text, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { dateCalendarWithSpace } from '~/util/formatDate';
import api from '~/services/api';
import {
  Container,
  PurpleBox,
  Content,
  DeliveryInformation,
  Title,
  TitleLeft,
  TextTitle,
  GetProduct,
  Information,
  TextLabel,
  TextInfo,
  OrderStatus,
  DateInfo,
  Options,
  ButtonOption,
} from './styles';

export default function Details({ navigation }) {
  // States
  const [visible, setVisible] = useState(false)

  // Check Status for start_date
  useEffect(() => {
    if (order.start_date === null) {
      setVisible(true);
    }
  }, [])


  // get order clicked from Dashboard
  const order = navigation.getParam('order');
  console.tron.log(order);

  // function to return the correct status of order
  function checkStatus(order) {
    if (order.canceled_at !== null) {
      return 'Cancelada';
    }
    if (order.start_date === null) {
      return 'Pendente';
    }
    if (order.start_date !== null && order.end_date === null) {
      return 'Retirada';
    }
    if (order.end_date !== null) {
      return 'Entregue';
    }
    return '';
  }

  // Update status from order
  async function handleGetProduct() {
    if (order.Transporter.orders_day >= 5) {
      Alert.alert("Não Foi possível assumir essa entrega", "Você já realizou cinco entregas na data de hoje!")
    }
    await api.put(`/transporter/${order.transporter_id}/order/${order.id}`);
    Alert.alert("Encomenda retirada com sucesso!")
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      <PurpleBox />
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Content>
        <DeliveryInformation style={{ elevation: 1 }}>
          <Title>
            <Icon name="local-shipping" size={30} color="#7159c1" />
            <TextTitle>Informações da Entrega</TextTitle>
          </Title>
          <Information>
            <TextLabel>DESTINATÁRIO</TextLabel>
            <TextInfo>{order.Recipient.name}</TextInfo>
          </Information>
          <Information>
            <TextLabel>ENDEREÇO DE ENTREGA</TextLabel>
            <TextInfo>{`${order.Recipient.street}, ${order.Recipient.number}, ${order.Recipient.city} - ${order.Recipient.state}, ${order.Recipient.cep}`}</TextInfo>
          </Information>
          <Information>
            <TextLabel>PRODUTO</TextLabel>
            <TextInfo>{order.product}</TextInfo>
          </Information>
        </DeliveryInformation>
        <OrderStatus style={{ elevation: 1 }}>
          <Title>
            <TitleLeft>
              <Icon name="event" size={30} color="#7159c1" />
              <TextTitle>Situação da entrega</TextTitle>
            </TitleLeft>
            <GetProduct visible={visible} onPress={() => handleGetProduct()}>
              <Icon name="local-mall" size={30} color="green" />
              <Text style={{ color: 'green' }}>Retirar</Text>
            </GetProduct>
          </Title>
          <Information>
            <TextLabel>STATUS</TextLabel>
            <TextInfo>{checkStatus(order)}</TextInfo>
          </Information>
          <DateInfo>
            <Information>
              <TextLabel>DATA DE RETIRADA</TextLabel>
              <TextInfo>{order.start_date ? dateCalendarWithSpace(order.start_date) : "-- / -- / --"}</TextInfo>
            </Information>
            <Information>
              <TextLabel>DATA DE ENTREGA</TextLabel>
              <TextInfo>{order.end_date ? dateCalendarWithSpace(order.end_date) : "-- / -- / --"}</TextInfo>
            </Information>
          </DateInfo>
        </OrderStatus>
        <Options >
          <ButtonOption onPress={() => navigation.navigate('CreateProblem', { order })}>
            <Icon name="highlight-off" size={30} color="red" />
            <Text style={{ textAlign: 'center' }}>Informar{"\n"}Problema</Text>
          </ButtonOption>
          <ButtonOption onPress={() => navigation.navigate('VisualizeProblem', { order })}>
            <Icon name="error-outline" size={30} color="orange" />
            <Text style={{ textAlign: 'center' }}>Visualizar{"\n"}Problemas</Text>
          </ButtonOption>
          <ButtonOption onPress={() => navigation.navigate('Confirm', { order })}>
            <Icon name="check-circle" size={30} color="purple" />
            <Text style={{ textAlign: 'center' }}>Confirmar{"\n"}Entrega</Text>
          </ButtonOption>
        </Options>
      </Content>
    </Container>
  );
}

Details.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da Encomenda',
  headerTintColor: "#FFF",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: '#7159c1',
    elevation: 0,
  },
  headerTitleStyle: {
    fontWeight: 'bold',

  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Icon name="chevron-left" size={30} color="#FFF" />
    </TouchableOpacity>
  ),
})