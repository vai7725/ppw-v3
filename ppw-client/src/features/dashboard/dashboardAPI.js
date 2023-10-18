import API from '../../config/axiosInstance';

export const fetchUsersData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.get('/authorized/users');
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
