import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const fetchUniversities = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get('/api/universities');
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const saveUniversity = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.post('/api/universities', data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const modifyUniversity = (universityId, data) => {
  console.log(universityId, data);
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.put(`/api/university/${universityId}`, data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
