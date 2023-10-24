import API from '../../config/axiosInstance';

export const handleContribution = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post('/contribute/paper', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
