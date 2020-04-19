import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import { dateCalendar } from '~/util/formatDate';

import { Container, Title, ProblemList, Problem, TextProblem, DateProblem, BoxPurple } from './styles';

export default function Visualize({ navigation }) {
  // States
  const [problems, setProblems] = useState([]);

  // Get Order from details
  const order = navigation.getParam('order');

  // load problems
  useEffect(() => {
    async function loadProblem() {
      const problemList = await api.get(`/order/${order.id}/problems`);
      setProblems(problemList.data);
    }
    loadProblem();
  }, [])

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Title>{order.product}</Title>
      <BoxPurple />
      <ProblemList
        data={problems}
        keyExtractor={problem => String(problem.id)}
        renderItem={({ item: problem }) => (
          <Problem style={{ elevation: 1 }}>
            <TextProblem>{problem.description}</TextProblem>
            <DateProblem>{dateCalendar(problem.createdAt)}</DateProblem>
          </Problem>
        )}
      />
    </Container>
  );
}

Visualize.navigationOptions = ({ navigation }) => ({
  title: 'Visualizar problemas',
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