import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import { Container, PurpleBox, ProblemDescription, SubmitButton } from './styles';

export default function Create({ navigation }) {
  // States
  const [problem, setProblem] = useState('');

  // Get order from Details
  const order = navigation.getParam('order');

  // send the problem
  async function handleSubmit() {
    if (order.end_date !== null) {
      Alert.alert("Erro de Solicitação", "Encomenda já foi entregue!")
      return;
    }
    await api.post(`/orders/${order.id}/problems`, {
      description: problem,
    })
    Alert.alert("Solicitação realizada", "Problema cadastrado com sucesso!")
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <PurpleBox />
      <ProblemDescription
        style={{ elevation: 1 }}
        multiline={true}
        autoCorrect={true}
        textAlignVertical="top"
        placeholder="Inclua aqui o problema que ocorreu na entrega"
        onChangeText={setProblem}
        value={problem}
      />
      <SubmitButton style={{ elevation: 1 }} onPress={() => handleSubmit()}><Text>Enviar</Text></SubmitButton>
    </Container>
  );
}

Create.navigationOptions = ({ navigation }) => ({
  title: 'Informar problema',
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
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={30} color="#FFF" />
    </TouchableOpacity>
  ),
})