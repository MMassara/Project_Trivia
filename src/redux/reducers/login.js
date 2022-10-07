import { ADD_NAME } from '../actions/index';

const INITIAL_STATE = {
  name: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_NAME:
    return {
      ...state,
      name: action.name,
    };
  default:
    return state;
  }
}

export default login;
