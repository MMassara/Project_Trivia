import { ADD_NAME, ADD_EMAIL, SHOW_POINTS } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  points: 0,
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_NAME:
    return {
      ...state,
      name: action.name,
    };
  case ADD_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case SHOW_POINTS:
    return {
      ...state,
      points: action.point
    }
  default:
    return state;
  }
}

export default login;
