import { all, takeLatest, put, call } from 'redux-saga/effects';
import { signInSuccess, signFailure } from './actions';
import { Alert } from 'react-native';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { transporter_id } = payload;

    const response = yield call(api.post, 'auth/transporter', { transporter_id });

    if (!response) {
      Alert.alert('Erro no login', 'Usuário não Cadastrado');
      yield put(signFailure());
    }

    const { transporter } = response.data;

    yield put(signInSuccess(transporter));

  } catch (err) {
    Alert.alert('Erro no login', 'Usuário não Cadastrado');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
