const linkToken = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = async () => {
  const response = await fetch(linkToken);
  const token = await response.json();
  return token;
};

export default tokenAPI;
