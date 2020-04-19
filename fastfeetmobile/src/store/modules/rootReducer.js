import { combineReducers } from 'redux';

import auth from './auth/reducer';
import transporter from './transporter/reducer';

export default combineReducers({
  auth,
  transporter,
});
