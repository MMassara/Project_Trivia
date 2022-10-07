export const LOGIN = 'LOGIN';

export const userLoginAction = (name, email) => ({
  type: LOGIN,
  payload: { name, email },
});
