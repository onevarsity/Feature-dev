import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // match your backend
});

export default api;