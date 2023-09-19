import API from '../../config/axiosInstance';

export const postContactQuery = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post('/contact', data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
