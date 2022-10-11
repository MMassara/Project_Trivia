import { ADD_NAME, SHOW_POINTS, SET_URL_GRAVATAR } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_NAME:
    return {
      ...state,
      name: action.name,
    };
  case SHOW_POINTS:
    return {
      ...state,
      score: action.score,
    };
  case SET_URL_GRAVATAR:
    return {
      ...state,
      gravatarEmail: action.url,
    };
  default:
    return state;
  }
}

export default player;
