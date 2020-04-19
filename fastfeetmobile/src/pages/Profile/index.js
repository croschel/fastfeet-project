import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { StatusBar } from 'react-native';
import { dateCalendar } from '~/util/formatDate';
import { Container, Image, Content, Info, Text, TextLabel, LogoutButton } from './styles';
import { signOut } from '~/store/modules/auth/actions';

function Profile() {
  // Dispatch variable
  const dispatch = useDispatch();

  // Selector for transporter persisted on redux
  const transporter = useSelector(state => state.transporter.profile);

  // Logout function 
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Image
        source={{ uri: transporter.File ? transporter.File.url : `https://api.adorable.io/avatars/200/${transporter.name}.png` }} />
      <Content>
        <Info>
          <TextLabel>Nome Completo</TextLabel>
          <Text>{transporter.name}</Text>
        </Info>
        <Info>
          <TextLabel>Email</TextLabel>
          <Text>{transporter.email}</Text>
        </Info>
        <Info>
          <TextLabel>Data de cadastro</TextLabel>
          <Text>{dateCalendar(transporter.createdAt)}</Text>
        </Info>
      </Content>
      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" size={30} color={tintColor} />
  )
}
export default withNavigationFocus(Profile);
