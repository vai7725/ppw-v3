import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUniversity = (universityId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/universities/${universityId}`);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

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

export const fetchPapers = (universityId, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/papers`, {
        params: { universityId, limit: 30, page },
      });
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
