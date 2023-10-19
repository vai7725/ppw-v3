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

export const fetchContacts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.get('/contact');
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const resolveContactQuery = (contactId) => {
  console.log(contactId);
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.put(`/contact/resolve/${contactId}`);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
