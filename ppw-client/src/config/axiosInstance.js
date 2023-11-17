import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: document.cookie,
    'Access-Control-Allow-Origin': import.meta.env.VITE_SERVER_URI,
  },

  withCredentials: true,
  credentials: 'include',
});

export default API;
