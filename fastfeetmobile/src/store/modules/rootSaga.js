import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import transporter from './transporter/sagas';

export default function* rootSaga() {
  return yield all([auth, transporter]);
}
