/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Input, Form } from '@rocketseat/unform';
import logo from '~/assets/logo.png';
import { signInRequest } from '~/store/modules/auth/actions';

// preciso adicionar um loading com useSelector
const loading = false;
export default function signIn() {
  // dispatch declare
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Coloque um email válido')
      .required('Digite um email'),
    password: Yup.string().required('Digite uma senha'),
  });
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="fasfeet Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <label htmlFor="email">SUA SENHA</label>
        <Input name="password" type="password" placeholder="***********" />
        <button type="submit">
          {loading ? (
            <AiOutlineLoading3Quarters className="loading-icon" />
          ) : (
              'Entrar no sistema'
            )}
        </button>
      </Form>
    </>
  );
}
