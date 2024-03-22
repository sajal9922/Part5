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

export default { getAll, setToken };
