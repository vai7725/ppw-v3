import API from '../../config/axiosInstance';

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
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.put(`/api/university/${universityId}`, data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const fetchCourse = (courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/course/${courseId}`);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const editCourse = (courseId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.put(`/api/course/${courseId}`, data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
