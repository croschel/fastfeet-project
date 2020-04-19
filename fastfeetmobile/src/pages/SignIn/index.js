import React, { useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import logo from '~/assets/fast-feet-white-logo.png';
import { Container, Form, FormInput, SubmitButton } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  // States
  const [transporterId, setTransporterId] = useState();

  // call actions for sign with id
  const dispatch = useDispatch();

  // send id to redux to check if transporter exist and SignIn
  function handleSubmit() {
    dispatch(signInRequest(transporterId));

  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7e40e8" />
      <Image source={logo} />
      <Form>
        <FormInput
          icon="person"
          placeholder="Informe seu ID de cadastro"
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="send"
          value={transporterId}
          onChangeText={setTransporterId}
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton onPress={handleSubmit}>
          Entrar no Sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
