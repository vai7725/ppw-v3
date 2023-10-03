import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: document.cookie,
  },
  withCredentials: true,
  credentials: 'include',
});

export default API;
