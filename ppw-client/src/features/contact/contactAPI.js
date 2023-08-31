import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postContactQuery = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post('/contact', data);
      console.log(res);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
