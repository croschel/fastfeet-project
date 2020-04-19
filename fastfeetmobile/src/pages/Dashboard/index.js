import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import { dateCalendar } from '~/util/formatDate';
import {
  Container, Header, Image, LeftHeader, Welcome, LogoutButton, Text,
  TextName, TitleOptions, Title, Options, TextLink,
  Delivery, TitleDelivery, TextDelivery, Status, StatusInfo,
  StatusLine, BallInfo, BottomInfo, GroupInfo, TextLabel, BottomInfoText,
  Details, Content,
} from './styles';

function Dashboard({ navigation, isFocused }) {
  // States
  const [orders, setOrders] = useState([]);
  const [backgroundPendent, setBackgroundPendent] = useState("#7159c1");
  const [backgroundDelivered, setBackgroundDelivered] = useState("rgba(100,100,100,0.8)");
  const [underlinePendent, setUnderlinePendent] = useState("underline");
  const [underlineDelivered, setUnderlineDelivered] = useState("none");
  const [waiting, setWaiting] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const [delivered, setDelivered] = useState(false);


  // Dispatch variable
  const dispatch = useDispatch();

  // Selector for Header
  const transporter = useSelector(state => state.transporter.profile);

  // function to Load Orders for transporter
  async function loadOrders() {
    const orders = await api.get(`/transporter/${transporter.id}/orders`);
    setOrders(orders.data);
    setBackgroundPendent("#7159c1");
    setBackgroundDelivered("rgba(100,100,100,0.8)");
    setUnderlineDelivered("none");
    setUnderlinePendent("underline");
  }
  // Orders for transporter on load
  useEffect(() => {
    if (isFocused) {
      loadOrders();
    }
  }, [isFocused])

  // Orders delivered 
  async function loadOrdersDelivered() {
    const orders = await api.get(`/transporter/${transporter.id}/ordered`);
    setOrders(orders.data);
    setBackgroundPendent("rgba(100,100,100,0.8)");
    setBackgroundDelivered("#7159c1");
    setUnderlineDelivered("underline");
    setUnderlinePendent("none");
  }

  // Logout function 
  function handleLogout() {
    dispatch(signOut());
  }

  // Functions to check status bar
  // Pendente
  function handlePending(order) {
    return true;
  }
  // Retirada
  function handleWithdrawn(order) {
    if (order.start_date !== null && order.end_date === null || order.end_date !== null) {
      return true;
    }
    return false;
  }
  // Delivered
  function handleDelivered(order) {
    if (order.end_date !== null) {
      return true;
    }
    return false;
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Header>
        <LeftHeader>
          <Image source={{
            uri: transporter.File
              ? transporter.File.url
              : `https://api.adorable.io/avatars/200/${transporter.name}.png`
          }} />
          <Welcome>
            <Text>Bem vindo de Volta,</Text>
            <TextName>{transporter.name}</TextName>
          </Welcome>
        </LeftHeader>
        <LogoutButton onPress={handleLogout}>
          <Icon name="exit-to-app" size={30} color="#A30000" />
        </LogoutButton>
      </Header>
      <TitleOptions>
        <Title>Entregas</Title>
        <Options>
          <TextLink
            style={{ marginRight: 15, color: backgroundPendent, textDecorationLine: underlinePendent }}
            onPress={loadOrders}
          >Pendentes</TextLink>
          <TextLink
            style={{ marginRight: 15, color: backgroundDelivered, textDecorationLine: underlineDelivered }}
            onPress={loadOrdersDelivered}>Entregues</TextLink>
        </Options>
      </TitleOptions>
      <Content showsVerticalScrollIndicator={false}>
        {orders.map(order => (
          <Delivery key={order.id}>
            <TitleDelivery>
              <Icon name="local-shipping" size={30} color="#7159c1" />
              <TextDelivery>{order.product}</TextDelivery>
            </TitleDelivery>
            <Status>
              <StatusLine />
              <StatusInfo>
                <BallInfo done={handlePending(order)} />{"\n"}
            Aguardando{"\n"}Retirada
          </StatusInfo>
              <StatusInfo>
                <BallInfo done={handleWithdrawn(order)} />{"\n"}
            Retirada
          </StatusInfo>
              <StatusInfo>
                <BallInfo done={handleDelivered(order)} />{"\n"}
            Entregue
          </StatusInfo>
            </Status>
            <BottomInfo>
              <GroupInfo>
                <TextLabel>Data</TextLabel>
                <BottomInfoText>{dateCalendar(order.createdAt)}</BottomInfoText>
              </GroupInfo>
              <GroupInfo>
                <TextLabel>Cidade</TextLabel>
                <BottomInfoText>{order.Recipient.city}</BottomInfoText>
              </GroupInfo>
              <Details onPress={() => navigation.navigate('Details', { order })} > Ver Detalhes</Details>
            </BottomInfo>
          </Delivery>
        ))}
      </Content>
    </Container >
  );
}
Dashboard.navigationOptions = {
  headerShown: false
}

export default withNavigationFocus(Dashboard);