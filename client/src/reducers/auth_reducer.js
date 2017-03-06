import * as action from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
      break;
    case UNAUTH_USER:
      return { ...state, authenticated: false };
      break;
    default:
      return state;

  }
}
