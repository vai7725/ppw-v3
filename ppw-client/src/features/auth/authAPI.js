import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const registerUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/register`, data);

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/login`, data);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/user`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/logout`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const forgotPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/forgot-password`, data);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const resetPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/reset-password`, data);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const resendVerificationEmail = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/reset-password`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const checkUsername = (username) => {
  return new Promise(async (resolve, reject) => {
    if (!username) return;
    try {
      const res = await API.post(`/auth/check-username/${username}`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
