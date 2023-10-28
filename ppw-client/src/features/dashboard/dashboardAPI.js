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
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.put(`/contact/resolve/${contactId}`);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const fetchContributedPapersData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.get(`/contribute/paper`);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const acceptContribution = (contributionId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.put(
        `/contribute/accept-contribution/${contributionId}?userId=${userId}`
      );
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
