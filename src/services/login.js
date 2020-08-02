import axios from 'axios';
import blogService from './blogs';

const baseUrl = '/api/login';

const login = async (username, password) => {
	const response = await axios.post(baseUrl, { username, password });
	return response.data;
};

export default { login };
