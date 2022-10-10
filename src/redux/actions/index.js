export const ADD_NAME = 'ADD_NAME';
export const ADD_EMAIL = 'ADD_EMAIL';

export const addName = (name) => ({
  type: ADD_NAME,
  name,
});

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});
