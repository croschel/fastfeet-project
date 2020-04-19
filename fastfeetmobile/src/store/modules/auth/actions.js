export function signInRequest(transporter_id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { transporter_id },
  };
}

export function signInSuccess(transporter) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { transporter },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
