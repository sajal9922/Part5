import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs'; // Update the base URL here
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, setToken, create };
