export const ADD_NAME = 'ADD_NAME';
export const ADD_EMAIL = 'ADD_EMAIL';
export const SHOW_POINTS = 'SHOW_POINTS';
export const SET_URL_GRAVATAR = 'SET_URL_GRAVATAR';
export const SHOW_RIGHT = 'SHOW_RIGHT';

export const addName = (name) => ({
  type: ADD_NAME,
  name,
});

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const showPoints = (score) => ({
  type: SHOW_POINTS,
  score,
});

export const setUrlGravatar = (url) => ({
  type: SET_URL_GRAVATAR,
  url,
});

export const showRight = (rights) => ({
  type: SHOW_RIGHT,
  rights,
});
