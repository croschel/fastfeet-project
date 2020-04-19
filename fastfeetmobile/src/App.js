import React from 'react';
import { useSelector } from 'react-redux';
import createRouter from '~/routes';

// import { Container } from './styles';

export default function App() {
  const signedIn = useSelector(state => state.auth.signed);

  const Routes = createRouter(signedIn)
  return (
    <Routes />
  );
}
