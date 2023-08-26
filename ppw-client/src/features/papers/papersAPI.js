import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCourses = (universityId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/courses`, { params: { universityId } });
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
