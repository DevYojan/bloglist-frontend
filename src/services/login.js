import axios from 'axios';
const baseUrl = '/api/login';

const login = (credentials) => {
  const response = axios.post(baseUrl, credentials);
  return response;
};

export default { login };
