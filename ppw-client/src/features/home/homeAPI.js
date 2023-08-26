import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.REACT_APP_SERVER_URI || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUniversities = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get('/api/university');
      console.log(res);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
